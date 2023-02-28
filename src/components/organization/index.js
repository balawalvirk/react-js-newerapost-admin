import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteEvent, getAllEvents, getAllOrganization, getAllPartners} from "../../services";
import {getAllEventsReset, getAllOrganizationReset, getAllPartnersReset} from "../../reducers";
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
import {baseFileUrl} from "../../constants/service";
import NotFoundImage from 'src/assets/images/404.png';


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
    const {data, loading, error} = useSelector((state) => state.getAllPartnersReducer);
    let navigate = useNavigate();
    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [count,setCount]=useState(0);
    useEffect(() => {
        dispatch(getAllPartners());
        return function cleanup() {
            dispatch(getAllPartnersReset());
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
        name: d.organizationName,
        preferred_country: d.preferredCountery,
        logo: <img style={{width:"48px"}} src={`${baseFileUrl}/${d.imageUrl}`}
                   onError={({currentTarget}) => {
                       currentTarget.onerror = null; // prevents looping
                       currentTarget.src = NotFoundImage;
                   }}/>,

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
            {/*<Grid container justifyContent={"flex-end"} style={{marginTop:"20px"}} xs={11.5} onClick={handleAddOrganization}>*/}
                {/*<CustomButtonSquareSmall text={"Add new organization"}/>*/}
            {/*</Grid>*/}
            {
                filteredData &&
                <ListViewer data={filteredData}
                            columns={["No", "Name", "Preferred Country","Logo"]}
                            keys={["index", "name", "preferred_country","logo"]}
                            searchField={"name"}/>
            }
        </>
    )

}

export default Organization;