import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllUsers,blockUnblock} from "src/services";
import {
    blockUnblockReducer,
    blockUserSliceReducer,
    deleteUserReducer,
    getAllUsersReset, updateUserPaymentApiSliceReducer,
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
    cancelSubscriptionReset,
    deleteUserReset,
    getUserPendingPaymentsApiReset, updatePendingUserPayment,
    updateUser, updateUserPaymentApiReset
} from "../../reducers";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import {
    blockUserApi,
    cancelSubscription,
    deleteUser,
    getUserPendingPaymentsApi,
    updateUserPaymentApi
} from "../../services";
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

const PendingPayments = () => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getUserPendingPaymentsApiSliceReducer);
    const {data:paymentData, loading:paymentDataLoading, error:paymentDataError} = useSelector((state) => state.updateUserPaymentApiSliceReducer);



    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [selectedUser,setSelectedUser]=useState(null);
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getUserPendingPaymentsApi());
        return function cleanup() {
            dispatch(getUserPendingPaymentsApiReset());
            dispatch(updateUserPaymentApiReset());
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
        if(paymentDataError){
            setConfirmation({
                show: true,
                title: "Error",
                text: paymentDataError,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(deleteUserReset())
        }else if(paymentData){
            if(selectedUser){
                const parsedData=(JSON.parse(JSON.stringify(data))).filter((user)=>selectedUser.user._id!==user._id);
                dispatch(updatePendingUserPayment(parsedData));
            }
            dispatch(updateUserPaymentApiReset())

        }
    },[paymentData,paymentDataLoading,paymentDataError])




    const handleUpdatePayment = (id) => {

        const selectedUserIndex=data.findIndex((d)=>(d._id).toString()===id.toString())
        let selectedUser=JSON.parse(JSON.stringify(data[selectedUserIndex]));
        selectedUser.subscription=null

        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Please note that you need to manually transfer payment. This user payment will be zero if you accept this?`
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    dispatch(updateUserPaymentApi({id:selectedUser._id}));
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
        update_payment: <span onClick={(e) => handleUpdatePayment(d._id)}><CustomButtonSquareSmall color={"red"} text={"Pay"}/></span>

    }))


    console.log("users = ",data)

    return (
        <>
            {(loading || paymentDataLoading) && <Loader/>}
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
                            columns={["No","Image", "First name", "Last name", "Email","Revenue", "Pay"]}
                            keys={["index","image", "first_name", "last_name", "email","revenue","update_payment"]}
                            searchField={"fullName"}/>
            }
        </>
    )
}
export default PendingPayments;
