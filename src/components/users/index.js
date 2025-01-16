import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllUsers,blockUnblock} from "src/services";
import {
    blockUnblockReducer,
    blockUserSliceReducer,
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
import {blockUnblockReset, cancelSubscriptionReset, deleteUserReset, updateUser} from "../../reducers";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import {blockUserApi, cancelSubscription, deleteUser} from "../../services";
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

const Users = () => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getAllUsersReducer);
    const {data:blockUnblockData, loading:blockUnblockLoading, error:blockUnblockError} = useSelector((state) => state.blockUserSliceReducer);
    const {data:cancelSubscriptionData, loading:cancelSubscriptionLoading, error:cancelSubscriptionError} =
        useSelector((state) => state.cancelSubscriptionReducer);
    const {data:deleteUserData, loading:deleteUserLoading, error:deleteUserError} =
        useSelector((state) => state.deleteUserReducer);



    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [selectedUser,setSelectedUser]=useState(null);
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getAllUsers());
        return function cleanup() {
            dispatch(getAllUsersReset());
            dispatch(blockUnblockReset());
            dispatch(cancelSubscriptionReset());

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
        if(blockUnblockError){
            setConfirmation({
                show: true,
                title: "Error",
                text: blockUnblockError
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(blockUnblockReset())
        }else if(blockUnblockData){
            if(selectedUser){
                const parsedData=JSON.parse(JSON.stringify(data));
                parsedData[selectedUser.index]=selectedUser.user;
                dispatch(updateUser(parsedData));
            }
            dispatch(blockUnblockReset())

        }
    },[blockUnblockData,blockUnblockLoading])



    useEffect(()=>{
        if(cancelSubscriptionError){
            setConfirmation({
                show: true,
                title: "Error",
                text: cancelSubscriptionError
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(cancelSubscriptionReset())
        }else if(cancelSubscriptionData){
            if(selectedUser){
                const parsedData=JSON.parse(JSON.stringify(data));
                parsedData[selectedUser.index]=selectedUser.user;
                dispatch(updateUser(parsedData));
            }
            dispatch(cancelSubscriptionReset())

        }
    },[cancelSubscriptionData,cancelSubscriptionLoading])



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
            dispatch(deleteUserReset())
        }else if(deleteUserData){
            if(selectedUser){
                const parsedData=(JSON.parse(JSON.stringify(data))).filter((user)=>selectedUser.user._id!==user._id);
                dispatch(updateUser(parsedData));
            }
            dispatch(deleteUserReset())

        }
    },[deleteUserData,deleteUserLoading])



    const handleBlockUnblock=(id)=>{

        const selectedUserIndex=data.findIndex((d)=>(d._id).toString()===id.toString())
        let selectedUser=JSON.parse(JSON.stringify(data[selectedUserIndex]));
        selectedUser.is_blocked=!selectedUser.is_blocked

        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Are you sure you want to ${!selectedUser.is_blocked?"unblock":"block"} this user?`
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    dispatch(blockUserApi({is_blocked:selectedUser.is_blocked,id:selectedUser._id}));
                    setSelectedUser({index:selectedUserIndex,user:selectedUser});
                    setConfirmation(initialConfirmation)
                }}>ok</Button>,
            buttonNo:<Button autoFocus onClick={(e) => {
                setConfirmation(initialConfirmation)
            }}>cancel</Button>
        });
    }


    const handleCancelSubscription = (id) => {

        const selectedUserIndex=data.findIndex((d)=>(d._id).toString()===id.toString())
        let selectedUser=JSON.parse(JSON.stringify(data[selectedUserIndex]));
        selectedUser.subscribed_package=null

        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Are you sure you want to cancel subscription of this user?`
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    dispatch(cancelSubscription({user_id:selectedUser._id}));
                    setSelectedUser({index:selectedUserIndex,user:selectedUser});
                    setConfirmation(initialConfirmation)
                }}>ok</Button>,
            buttonNo:<Button autoFocus onClick={(e) => {
                setConfirmation(initialConfirmation)
            }}>cancel</Button>
        });

    }


    const handleDeleteUser = (id) => {

        const selectedUserIndex=data.findIndex((d)=>(d._id).toString()===id.toString())
        let selectedUser=JSON.parse(JSON.stringify(data[selectedUserIndex]));
        selectedUser.subscription=null

        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Are you sure you want to delete this user?`
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    dispatch(deleteUser(selectedUser._id));
                    setSelectedUser({index:selectedUserIndex,user:selectedUser});
                    setConfirmation(initialConfirmation)
                }}>ok</Button>,
            buttonNo:<Button autoFocus onClick={(e) => {
                setConfirmation(initialConfirmation)
            }}>cancel</Button>
        });

    }


    let filteredData = [];
    filteredData = data && data.length > 0 && data.map((d, index) => ({
        index: index + 1,
        image: d.image,
        fullName: `${d.first_name} ${d.last_name}`,
        first_name: `${d.first_name}`,
        last_name: `${d.first_name}`,
        email: d.email,
        type: (d.type) || "",
        revenue:(d.usersRevenue).toFixed(2),
        block: d.is_blocked ?
            <span onClick={(e) => handleBlockUnblock(d._id)}><CustomButtonSquareSmall text={"Unblock"}/></span> :
            <span onClick={(e) => handleBlockUnblock(d._id)}><CustomButtonSquareSmall color={"red"} text={"Block"}/></span>

    }))


    console.log("users = ",data)

    return (
        <>
            {(loading || blockUnblockLoading || cancelSubscriptionLoading || deleteUserLoading) && <Loader/>}
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
                            columns={["No","Image", "First name", "Last name", "Email","Type","Revenue", "Block/Unblock"]}
                            keys={["index","image", "first_name", "last_name", "email","type","revenue","block"]}
                            searchField={"fullName"}/>
            }
        </>
    )
}
export default Users;
