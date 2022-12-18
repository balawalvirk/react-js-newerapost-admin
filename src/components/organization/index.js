import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteEvent, getAllEvents, getAllOrganization} from "../../services";
import {getAllEventsReset, getAllOrganizationReset} from "../../reducers";
import {getFormattedDateTime, removeAccessToken} from "../../utils";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import {CustomButtonSquareSmall} from "../common/CustomButton";
import React from "react";
import Loader from "../common/Loader";
import ListViewer from "../common/ListViewer";
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import Grid from "@mui/material/Grid/Grid";
import Button from "@mui/material/Button/Button";
import AddOrganization from "../add-organization";



const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    children:null,
    buttonYes: null,
    buttonNo: null,
}

const Organization = () => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getAllOrganizationReducer);
    let navigate = useNavigate();
    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [count,setCount]=useState(0);
    useEffect(() => {
        dispatch(getAllOrganization());
        return function cleanup() {
            dispatch(getAllOrganizationReset());
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


    const refreshData=()=>{
        dispatch(getAllOrganization());
        handleOnCloseConfirmation(null);
    }

    const handleOnCloseConfirmation=(e)=>{
        setConfirmation(initialConfirmation);
        setCount(count+1);
    }

    const handleAddOrganization=(e)=>{

        setConfirmation({
            show: true,
            title: "Add new organization",
            text: ``,
            data: {},
            isUpdate: false,
            children:<AddOrganization onCloseConfirmation={handleOnCloseConfirmation} refreshData={refreshData}/>,
            buttonYes:null,
            buttonNo:null
        });
    }



    let filteredData = [];
    filteredData = data && data.length > 0 && data.map((d, index) => ({
        index: index + 1,
        name: d.name,
        type: d.type,

    }))



    return (
        <>
            {(loading) && <Loader/>}
            {
                confirmation.show &&
                <ResponsiveConfirmationDialog
                    title={confirmation.title} text={confirmation.text}
                    buttons={confirmation.buttonYes}
                    otherButton={confirmation.buttonNo}
                >
                    {confirmation.children}
                </ResponsiveConfirmationDialog>
            }
            <Grid container justifyContent={"flex-end"} style={{marginTop:"20px"}} xs={11.5} onClick={handleAddOrganization}>
                <CustomButtonSquareSmall text={"Add new organization"}/>
            </Grid>
            {
                filteredData &&
                <ListViewer data={filteredData}
                            columns={["No", "Name", "Type"]}
                            keys={["index", "name", "type"]}
                            searchField={"name"}/>
            }
        </>
    )

}

export default Organization;