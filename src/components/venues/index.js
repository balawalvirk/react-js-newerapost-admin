import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllUsers, blockUnblock} from "src/services";
import {
    blockUnblockReducer,
    deletePartnerByIdReducer,
    deleteUserReducer, deleteVenueByIdReducer,
    getAllUsersReset, getAllVenuesReducer,
    validateUserSliceReset
} from "src/reducers";
import ListViewer from "src/components/common/ListViewer";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from "../common/Loader";
import Grid from "@mui/material/Grid/Grid";
import {CustomButtonSquareSmall} from "src/components/common/CustomButton";
import Button from "@mui/material/Button/Button";
import {getFormattedDate, removeAccessToken, saveToken} from "../../utils";
import {
    blockUnblockReset,
    cancelSubscriptionReset, deletePartnerByIdReset,
    deleteUserReset, deleteVenueByIdReset,
    getAllPartnersReset, getAllVenuesReset, updatePartner,
    updateUser, updateVenue
} from "../../reducers";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import {
    cancelSubscription,
    deletePartnerById,
    deleteUser,
    deleteVenueById,
    getAllPartners,
    getAllVenues
} from "../../services";
import moment from "moment";
import PartnerDetails from "../partner-details";

const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null,
    children: null
}

const Venues = () => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getAllVenuesReducer);
    const {data: deleteUserData, loading: deleteUserLoading, error: deleteUserError} =
        useSelector((state) => state.deleteVenueByIdReducer);


    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [selectedUser, setSelectedUser] = useState(null);
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getAllVenues());
        return function cleanup() {
            dispatch(getAllVenuesReset());
            dispatch(deleteVenueByIdReset())
        };
    }, []);

    useEffect(() => {
        if (error) {
            if (error === "Please authenticate") {
                removeAccessToken();
                navigate(`/login`)
            }
        }
    }, [data, loading]);


    useEffect(() => {
        if (deleteUserError) {
            setConfirmation({
                show: true,
                title: "Error",
                text: deleteUserError,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo: null
            });
            dispatch(deleteVenueByIdReset())
        } else if (deleteUserData) {
            if (selectedUser) {
                const parsedData = (JSON.parse(JSON.stringify(data))).filter((user) => selectedUser.user.id !== user.id);
                dispatch(updateVenue(parsedData));
            }
            dispatch(deleteVenueByIdReset())

        }
    }, [deleteUserData, deleteUserLoading])


    const handleDeleteVenue = (e, id) => {
        e.stopPropagation();
        const selectedUserIndex = data.findIndex((d) => (d.id).toString() === id.toString())
        let selectedUser = JSON.parse(JSON.stringify(data[selectedUserIndex]));
        selectedUser.subscription = null

        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Are you sure you want to delete this venue?`
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    dispatch(deleteVenueById(selectedUser.id));
                    setSelectedUser({index: selectedUserIndex, user: selectedUser});
                    setConfirmation(initialConfirmation)
                }}>ok</Button>,
            buttonNo: <Button autoFocus onClick={(e) => {
                setConfirmation(initialConfirmation)
            }}>cancel</Button>
        });

    }


    let filteredData = [];
    filteredData = data && data.length > 0 && data.map((d, index) => ({
        index: index + 1,
        name: d.name,
        bio: `${d.venueBio}`,
        categoryTags: (d.categoryTags).join(","),
        amenities: (JSON.parse(d.amenities)).join(","),
        delete:
            <span onClick={(e) => handleDeleteVenue(e, d.id)}><CustomButtonSquareSmall text={"Delete"}
                                                                                       color={"red"}/></span>,
    }))


    return (
        <>
            {(loading || deleteUserLoading) && <Loader/>}
            {
                confirmation.show &&
                <ResponsiveConfirmationDialog
                    width={confirmation.children && "60vw"}
                    title={confirmation.title} text={confirmation.text}
                    buttons={confirmation.buttonYes}
                    otherButton={confirmation.buttonNo}
                >
                    {confirmation.children}
                </ResponsiveConfirmationDialog>
            }
            {
                filteredData &&
                <ListViewer data={filteredData}
                            columns={["No", "Name", "Bio", "Category Tags", "Amenities", "Delete"]}
                            keys={["index", "name", "bio", "categoryTags", "amenities", "delete"]}
                            searchField={"name"}/>
            }
        </>
    )
}
export default Venues;