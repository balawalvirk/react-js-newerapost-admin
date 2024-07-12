import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllUsers,blockUnblock} from "src/services";
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
import {blockUnblockReset, cancelSubscriptionReset, deleteUserReset, updateUser} from "../../reducers";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import {cancelSubscription, deleteUser} from "../../services";
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

const Reward = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const location = useLocation().pathname;
    const [confirmation, setConfirmation] = useState(initialConfirmation);

    useEffect(() => {
        navigate("list")
    }, [])





    return (
        <>
            <Grid item xs={12} container justifyContent={"center"}>
                <Outlet context={[]}  />
            </Grid>
        </>
    )
}
export default Reward;
