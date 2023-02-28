import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllUsers,blockUnblock} from "src/services";
import {
    blockUnblockReducer,
    deletePartnerByIdReducer,
    deleteUserReducer,
    getAllUsersReset,
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
    deleteUserReset,
    getAllPartnersReset, updatePartner,
    updateUser
} from "../../reducers";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import {cancelSubscription, deletePartnerById, deleteUser, getAllPartners} from "../../services";
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
    children:null
}

const Partners = () => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getAllPartnersReducer);
    const {data:deleteUserData, loading:deleteUserLoading, error:deleteUserError} =
        useSelector((state) => state.deletePartnerByIdReducer);



    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [selectedUser,setSelectedUser]=useState(null);
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getAllPartners());
        return function cleanup() {
            dispatch(getAllPartnersReset());
            dispatch(deletePartnerByIdReset())

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



    useEffect(()=>{
        if(deleteUserError){
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
                buttonNo:null
            });
            dispatch(deletePartnerByIdReset())
        }else if(deleteUserData){
            if(selectedUser){
                const parsedData=(JSON.parse(JSON.stringify(data))).filter((user)=>selectedUser.user.id!==user.id);
                dispatch(updatePartner(parsedData));
            }
            dispatch(deletePartnerByIdReset())

        }
    },[deleteUserData,deleteUserLoading])


    const handleDeletePartner = (id) => {
        const selectedUserIndex=data.findIndex((d)=>(d.id).toString()===id.toString())
        let selectedUser=JSON.parse(JSON.stringify(data[selectedUserIndex]));
        selectedUser.subscription=null

        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Are you sure you want to delete this partner?`
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    dispatch(deletePartnerById(selectedUser.id));
                    setSelectedUser({index:selectedUserIndex,user:selectedUser});
                    setConfirmation(initialConfirmation)
                }}>ok</Button>,
            buttonNo:<Button autoFocus onClick={(e) => {
                setConfirmation(initialConfirmation)
            }}>cancel</Button>
        });

    }


    const handlePartnerDetail = (id) => {

        const selectedUserIndex=data.findIndex((d)=>(d.id).toString()===id.toString())
        let selectedUser=JSON.parse(JSON.stringify(data[selectedUserIndex]));
        selectedUser.subscription=null

        setConfirmation({
            show: true,
            title: `Partner Details`,
            text: ``
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    setConfirmation(initialConfirmation)
                }}>ok</Button>,
            buttonNo:null,
            children:<PartnerDetails partnerId={id}/>
        });

    }


    let filteredData = [];
    filteredData = data && data.length > 0 && data.map((d, index) => ({
        index: index + 1,
        fullName: `${d.firstName} ${d.lastName}`,
        phoneNumber: d.phoneNumber,
        email: d.email,
        organizationName: d.organizationName,
        organizationType: d.organizationType,
        delete:
            <span onClick={(e) => handleDeletePartner(d.id)}><CustomButtonSquareSmall text={"Delete"} color={"red"}/></span>,
        details:
            <span onClick={(e) => handlePartnerDetail(d.id)}><CustomButtonSquareSmall text={"Details"} color={"red"}/></span>,
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
                            columns={["No", "User name", "Phone number", "Email", "Organization Name",
                                "Organization Type","Delete","Details"]}
                            keys={["index", "fullName", "phoneNumber", "email", "organizationName", "organizationType","delete",
                                "details"]}
                            searchField={"fullName"}/>
            }
        </>
    )
}
export default Partners;