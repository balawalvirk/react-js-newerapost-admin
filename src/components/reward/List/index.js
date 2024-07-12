import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllUsers, blockUnblock} from "src/services";
import {blockUnblockReducer, deleteUserReducer, getAllUsersReset, validateUserSliceReset} from "src/reducers";
import ListViewer from "src/components/common/ListViewer";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from "../../common/Loader";
import Grid from "@mui/material/Grid/Grid";
import {CustomButtonSquareSmall} from "src/components/common/CustomButton";
import Button from "@mui/material/Button/Button";
import {getFormattedDate, removeAccessToken, saveToken} from "../../../utils";
import {blockUnblockReset, cancelSubscriptionReset, deleteUserReset, updateUser} from "../../../reducers";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import ResponsiveConfirmationDialog from "../../common/ResponsiveConfirmation";
import {cancelSubscription, deleteUser} from "../../../services";
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
    const {data: blockUnblockData, loading: blockUnblockLoading, error: blockUnblockError} = useSelector((state) => state.blockUnblockReducer);
    const {data: cancelSubscriptionData, loading: cancelSubscriptionLoading, error: cancelSubscriptionError} =
        useSelector((state) => state.cancelSubscriptionReducer);
    const {data: deleteUserData, loading: deleteUserLoading, error: deleteUserError} =
        useSelector((state) => state.deleteUserReducer);


    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [selectedUser, setSelectedUser] = useState(null);
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getAllUsers());
        return function cleanup() {
            dispatch(getAllUsersReset());
            dispatch(blockUnblockReset());
            dispatch(cancelSubscriptionReset());

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
        if (blockUnblockError) {
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
                buttonNo: null
            });
            dispatch(blockUnblockReset())
        } else if (blockUnblockData) {
            if (selectedUser) {
                const parsedData = JSON.parse(JSON.stringify(data));
                parsedData[selectedUser.index] = selectedUser.user;
                dispatch(updateUser(parsedData));
            }
            dispatch(blockUnblockReset())

        }
    }, [blockUnblockData, blockUnblockLoading])


    useEffect(() => {
        if (cancelSubscriptionError) {
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
                buttonNo: null
            });
            dispatch(cancelSubscriptionReset())
        } else if (cancelSubscriptionData) {
            if (selectedUser) {
                const parsedData = JSON.parse(JSON.stringify(data));
                parsedData[selectedUser.index] = selectedUser.user;
                dispatch(updateUser(parsedData));
            }
            dispatch(cancelSubscriptionReset())

        }
    }, [cancelSubscriptionData, cancelSubscriptionLoading])


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
            dispatch(deleteUserReset())
        } else if (deleteUserData) {
            if (selectedUser) {
                const parsedData = (JSON.parse(JSON.stringify(data))).filter((user) => selectedUser.user._id !== user._id);
                dispatch(updateUser(parsedData));
            }
            dispatch(deleteUserReset())

        }
    }, [deleteUserData, deleteUserLoading])


    const handleBlockUnblock = (id) => {

        const selectedUserIndex = data.findIndex((d) => (d._id).toString() === id.toString())
        let selectedUser = JSON.parse(JSON.stringify(data[selectedUserIndex]));
        selectedUser.blocked = selectedUser.blocked === "block" ? "unblock" : "block"

        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Are you sure you want to ${!selectedUser.block ? "unblock" : "block"} this user?`
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    dispatch(blockUnblock({blocked: selectedUser.blocked, user: selectedUser._id}));
                    setSelectedUser({index: selectedUserIndex, user: selectedUser});
                    setConfirmation(initialConfirmation)
                }}>ok</Button>,
            buttonNo: <Button autoFocus onClick={(e) => {
                setConfirmation(initialConfirmation)
            }}>cancel</Button>
        });
    }


    const handleCancelSubscription = (id) => {

        const selectedUserIndex = data.findIndex((d) => (d._id).toString() === id.toString())
        let selectedUser = JSON.parse(JSON.stringify(data[selectedUserIndex]));
        selectedUser.subscribed_package = null

        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Are you sure you want to cancel subscription of this user?`
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    dispatch(cancelSubscription({user_id: selectedUser._id}));
                    setSelectedUser({index: selectedUserIndex, user: selectedUser});
                    setConfirmation(initialConfirmation)
                }}>ok</Button>,
            buttonNo: <Button autoFocus onClick={(e) => {
                setConfirmation(initialConfirmation)
            }}>cancel</Button>
        });

    }


    const handleRewardUser = (id) => {
        console.log("reward user")
    }


    const handleDeleteUser = (id) => {

        const selectedUserIndex = data.findIndex((d) => (d._id).toString() === id.toString())
        let selectedUser = JSON.parse(JSON.stringify(data[selectedUserIndex]));
        selectedUser.subscription = null

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
                    setSelectedUser({index: selectedUserIndex, user: selectedUser});
                    setConfirmation(initialConfirmation)
                }}>ok</Button>,
            buttonNo: <Button autoFocus onClick={(e) => {
                setConfirmation(initialConfirmation)
            }}>cancel</Button>
        });

    }


    let filteredData = [];
    filteredData = data && data.length > 0 && data.filter((d) => d.subscribed_package && d.subscribed_package.status === "active")
        .map((d, index) => ({
            index: index + 1,
            fullName: `${d.first_name} ${d.last_name}`,
            first_name: `${d.first_name}`,
            last_name: `${d.first_name}`,
            email: d.email,
            subscribed_package: (d.subscribed_package && d.subscribed_package.name) || "Not Subscribed",
            type: (d.type) || "",
            reward: d.subscribed_package && d.subscribed_package.status === "active" &&
                <span onClick={(e) => navigate('/home/reward/add', {state: {id: d._id}})}>
                <CustomButtonSquareSmall text={"Reward"}/></span>,


        }))


    console.log("users = ", data)

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
                            columns={["No", "First name", "Last name", "Email", "Subscribed Package", "Type", "Reward"]}
                            keys={["index", "first_name", "last_name", "email", "subscribed_package", "type", "reward"]}
                            searchField={"fullName"}/>
            }
        </>
    )
}
export default Users;
