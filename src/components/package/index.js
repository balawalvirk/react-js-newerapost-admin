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
    deleteUserReset, getAllExperiencesReset, getAllGroupsReset,
    getAllWaiverReset,
    updateUser
} from "../../reducers";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import {cancelSubscription, deleteUser, getAllExperiences, getAllGroupsApi} from "../../services";
import moment from "moment";
import {CSVLink} from "react-csv";

const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}



let initialPackage = {
    name: {value: null, error: "Name cant be empty", showError: false},
    currency: {value: null, error: "Currency cant be empty", showError: false},
    amount: {value: null, error: "Amount cant be empty", showError: false},
    packageId: {value: null, error: "Amount cant be empty", showError: false},
};

let hideExport=true;
const Package = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const location = useLocation().pathname;
    const [confirmation, setConfirmation] = useState(initialConfirmation);

    useEffect(() => {
        navigate("list")
    }, [])


    const handleUpdate=(pck)=>{

        console.log(pck)
        if(pck){
            const tempPack=JSON.parse(JSON.stringify(initialPackage));
            tempPack.name.value=pck.name;
            tempPack.currency.value=pck.currency;
            tempPack.amount.value=pck.amount+"";
            tempPack.packageId.value=pck._id;
            initialPackage=tempPack;
            navigate('/home/package/update')
        }

    }




    return (
        <>
            <Grid item xs={12} container justifyContent={"center"}>

                {(location=="/home/package/list" ) &&
                    <Grid item xs={11.5} container justifyContent={"flex-end"} style={{marginTop: "20px"}}
                          onClick={(e) => navigate('/home/package/add')}>
                        <CustomButtonSquareSmall>Add</CustomButtonSquareSmall>
                    </Grid>
                }
                <Outlet context={[handleUpdate,initialPackage,hideExport]}  />
            </Grid>
        </>
    )
}
export default Package;
