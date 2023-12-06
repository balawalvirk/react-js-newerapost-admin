import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllUsers, blockUnblock, getAllWaivers} from "src/services";
import {blockUnblockReducer, deleteUserReducer, getAllUsersReset, validateUserSliceReset} from "src/reducers";
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
    cancelSubscriptionReset,
    deleteUserReset, getAllExperiencesReset,
    getAllWaiverReset,
    updateUser
} from "../../reducers";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import {cancelSubscription, deleteUser, getAllExperiences} from "../../services";
import moment from "moment";

const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}

const Experiences = () => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getAllExperiencesReducer);



    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [selectedUser,setSelectedUser]=useState(null);
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getAllExperiences());
        return function cleanup() {
            dispatch(getAllExperiencesReset());
        };
    }, []);

    useEffect(()=>{
        if(error){
            if(error==="Please authenticate"){
                removeAccessToken();
                navigate(`/login`)
            }
        }
    },[data,loading]);





    let filteredData = [];
    filteredData = data && data.length > 0 && data.map((d, index) => ({
        index: index + 1,
        name: `${d.name || "-"}`,
        link: `${d.link || "-"}`,
        image: `${d.image || "-"}`,
        date_created:getFormattedDate(d.date_created),
        fullName:d.name
    }))


    console.log("users = ",data)

    return (
        <>
            {(loading) && <Loader/>}
            {
                confirmation.show &&
                <ResponsiveConfirmationDialog
                    title={confirmation.title} text={confirmation.text}
                    buttons={confirmation.buttonYes}
                    otherButton={confirmation.buttonNo}
                />
            }
            {
                filteredData &&
                <ListViewer data={filteredData}
                            columns={["No", "Name", "Link", "Image","Date Created"]}
                            keys={["index", "name", "link", "image","date_created"]}
                            searchField={"fullName"}/>
            }
        </>
    )
}
export default Experiences;
