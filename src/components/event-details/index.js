import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllEventOfReservations, getAllUsers, getPartnerDetails} from "../../services";
import Grid from "@mui/material/Grid/Grid";
import React from "react";
import {CustomLabelHeader, CustomLabelHeaderLogin, CustomLabelNormal20} from "../common/CustomLabel";
import moment from "moment";
import Loader from "../common/Loader";
import {
    deletePartnerByIdReset,
    getAllEventOfReservationsReset,
    getAllPartnersReset,
    getPartnerDetailsReset
} from "../../reducers";
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import ListViewer from "../common/ListViewer";


const EventDetails = (props) => {
    const dispatch = useDispatch()
    const {eventId} = props;
    const {data, loading, error} = useSelector((state) => state.getAllEventOfReservationsReducer);
    const [eventDetails, setEventDetails] = useState([]);
    const [count, setCount] = useState(0);
    const [totalCredits, setTotalCredits] = useState(0);


    useEffect(() => {
        dispatch(getAllEventOfReservations(eventId));
        return function cleanup() {
            dispatch(getAllEventOfReservationsReset());
        };
    }, [])


    useEffect(() => {

        if (data && data.data) {
            const eventsReservations = data.data;
            const filteredData = eventsReservations.map((event, index) => (
                {
                    index: index + 1,
                    user: (event.user && `${event.user.firstName} ${event.user.lastName}`) || "not found",
                    partner: event.partner && `${event.partner.firstName} ${event.partner.lastName}`,
                    credits: event.credits,
                    status: event.eventReservation === 'cancelled' ? (event.cancellationStatus || "cancelled") : event.eventReservation,
                    isScanned: event.isScanned ? "Yes" : "No"
                }
            ))

            let totalCredits = 0;
            for (let f of filteredData) {
                totalCredits += f.credits;
            }

            setTotalCredits(totalCredits);

            setEventDetails(filteredData);
            setCount(count + 1);
        }
    }, [data, error]);


    return (
        <>
            {(loading) && <Loader/>}

            <Grid container style={{marginTop: "10px"}} justifyContent={"center"}>
                <Grid item xs={11.5} container justifyContent={"flex-end"}>
                    <CustomLabelNormal20 text={"Total Credits " + totalCredits} fontWeight={"bold"}/>
                </Grid>
            </Grid>

            {
                eventDetails &&
                <ListViewer data={eventDetails}
                            count={count}
                            columns={["No", "User", "Partner", "Credits", "Status", "Scanned"]}
                            keys={["index", "user", "partner", "credits", "status", "isScanned"]}
                            searchField={"user"}/>
            }
        </>
    )

}

export default EventDetails;