import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ListViewer from "src/components/common/ListViewer";
import React from "react";
import {getFormattedDate, removeAccessToken, saveToken} from "../../../utils";
import {
    blockUnblockReset,
    cancelSubscriptionReset, deletePackageApiReset,
    deleteUserReset, getAllExperiencesReset, getAllGroupsReset,
    getAllWaiverReset,
    updateUser
} from "../../../reducers";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import ResponsiveConfirmationDialog from "../../common/ResponsiveConfirmation";
import {cancelSubscription, deletePackageApi, deleteUser, getAllExperiences, getAllGroupsApi} from "../../../services";
import moment from "moment";
import {getSubscriptionPackageApi} from "../../../services";
import {getSubscriptionPackageReset} from "../../../reducers";
import Loader from "../../common/Loader";
import {CustomButtonSquareSmall} from "../../common/CustomButton";
import { useOutletContext } from "react-router-dom";
import Button from "@mui/material/Button/Button";

const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}

let tempDeletedId;
const ListPackages = (props) => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getSubscriptionPackageReducer);
    const {data:deletePackageData, loading:deletePackageLoading, error:deletePackageError} =
        useSelector((state) => state.deletePackageApiSliceReducer);

    const [deleted,setDeleted]=useState([]);

    const [handleUpdate] = useOutletContext();


    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [selectedUser,setSelectedUser]=useState(null);
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getSubscriptionPackageApi());
        return function cleanup() {
            dispatch(getSubscriptionPackageReset());
            dispatch(deletePackageApiReset());

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
        if(deletePackageError){
            setConfirmation({
                show: true,
                title: "Error",
                text: deletePackageError
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(deletePackageApiReset());
        }
        else if(deletePackageData){
            setConfirmation({
                show: true,
                title: "Success",
                text: "Package deleted",
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            deleted.push(tempDeletedId)
            setDeleted(deleted)
        }
    },[deletePackageData,deletePackageError,deletePackageLoading]);

    const handleDelete = (id) => {



        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Are you sure you want to delete this package?`,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    tempDeletedId=id;
                    dispatch(deletePackageApi({packageId:id}));
                    setConfirmation(initialConfirmation)
                }}>ok</Button>,
            buttonNo:<Button autoFocus onClick={(e) => {
                setConfirmation(initialConfirmation)
            }}>cancel</Button>
        });

    }




    let filteredData = [];
    filteredData = data && data.length > 0 && data.filter((d)=> deleted.indexOf(d._id)===-1).map((d, index) => ({
        index: index + 1,
        name: `${d.name || "-"}`,
        currency: `${d.currency || "-"}`,
        amount: `${d.amount || "-"}`,
        fullName:d.name,
        update: <span onClick={(e) => handleUpdate(d)}><CustomButtonSquareSmall text={"Update"}/></span>,
        delete: <span onClick={(e) => handleDelete(d._id)}><CustomButtonSquareSmall text={"Delete"} color={"red"}/></span>,

    }))






    console.log("users = ",deleted)

    return (
        <>
            {(loading || deletePackageLoading) && <Loader/>}
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
                            columns={["No", "Name", "Currency", "Amount","Update","Delete"]}
                            keys={["index", "name", "currency", "amount","update","delete"]}
                            searchField={"fullName"}
                            hideExport={props.hideExport}
                />
            }
        </>
    )
}
export default ListPackages;
