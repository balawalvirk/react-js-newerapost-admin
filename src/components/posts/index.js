import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import React from "react";
import Grid from "@mui/material/Grid/Grid";
import {useLocation, useNavigate, Outlet} from "react-router-dom"

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
const Posts = () => {
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

                <Outlet context={[initialPackage,hideExport]}  />
            </Grid>
        </>
    )
}
export default Posts;
