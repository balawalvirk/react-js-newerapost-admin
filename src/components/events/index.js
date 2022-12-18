import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {blockUnblock, deleteEvent, getAllEvents, getAllUsers} from "../../services";
import {
    blockUnblockReset,
    cancelSubscriptionReset,
    deleteEventReducer, deleteEventReset,
    getAllEventsReset,
    getAllUsersReset, updateEvent, updateUser
} from "../../reducers";
import {getFormattedDate, getFormattedDateTime, removeAccessToken} from "../../utils";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import {CustomButtonSquareSmall} from "../common/CustomButton";
import React from "react";
import Loader from "../common/Loader";
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import ListViewer from "../common/ListViewer";
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

const Events = () => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getAllEventsReducer);
    const {data:deleteEventData, loading:deleteEventLoading, error:deleteEventError} =
        useSelector((state) => state.deleteEventReducer);
    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [selectedUser, setSelectedUser] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllEvents());
        return function cleanup() {
            dispatch(getAllEventsReset());
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


    useEffect(()=>{
        if(deleteEventError){
            setConfirmation({
                show: true,
                title: "Error",
                text: deleteEventError
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(deleteEventReset())
        }else if(deleteEventData){
            if(selectedUser){
                let parsedData=JSON.parse(JSON.stringify(data));
                parsedData=parsedData.filter((data,index)=>index!==selectedUser.index);
                dispatch(updateEvent(parsedData));
            }
            dispatch(deleteEventReset())

        }
    },[deleteEventData,deleteEventLoading])



    const handleDeleteEvent=(id)=>{

        const selectedUserIndex=data.findIndex((d)=>(d.id).toString()===id.toString())
        let selectedUser=JSON.parse(JSON.stringify(data[selectedUserIndex]));

        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Are you sure you want to delete this event?`
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    dispatch(deleteEvent(selectedUser.id));
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
        eventName: d.title,
        venueName: d.venue && d.venue.name,
        venueType: d.venue && d.venue.categoryTags,
        organizerName: d.organizer && d.organizer.organizerName,
        startDateTime: d.state && getFormattedDateTime(d.state),
        endDateTime: d.city && getFormattedDateTime(d.city),
        delete: <span onClick={(e) => handleDeleteEvent(d.id)}><CustomButtonSquareSmall color={"red"} text={"Delete"}/></span>

    }))



    return (
        <>
            {(loading || deleteEventLoading) && <Loader/>}
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
                            columns={["No", "Event name", "Venue name", "Type of venue", "Organizer name", "Start date/end date",
                                "Start time/end time", "Delete"]}
                            keys={["index", "eventName", "venueName", "venueType", "organizerName", "startDateTime", "endDateTime",
                                "delete",]}
                            searchField={"eventName"}/>
            }
        </>
    )

}

export default Events;