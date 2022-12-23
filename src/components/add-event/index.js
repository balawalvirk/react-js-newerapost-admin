import {CustomTextField} from "../common/text";
import Grid from "@mui/material/Grid/Grid";
import React, {useEffect, useState} from "react";
import {transformValidateObject, validateUserInput} from "../../utils";
import {getAllEventDetails, getAllEvents, postEventDetails, postOrganization, validateAdmin} from "../../services";
import {CustomButtonSquareSmall} from "../common/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button/Button";
import {
    deleteEventReset,
    getAllEventDetailsReducer, getAllEventDetailsReset,
    getAllEventsReset, getStaticDataByTypeReset, postEventDetailsReducer, postEventDetailsReset,
    postOrganizationReset,
    updateEvent
} from "../../reducers";
import Loader from "../common/Loader";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {CustomDropdown} from "../common/CustomDrowDown";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {CustomLabelHeader, CustomLabelNormalLanding18} from "../common/CustomLabel";
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";


const initialLogin = {
    title: {value: null, error: "Title cant be empty", showError: false},
    state: {value: null, error: "Start date cant be empty", showError: false},
    startingTime: {value: moment(new Date().toISOString()).format("DD/MM/yyyy"), error: "Start time cant be empty"},
    city: {value: moment(new Date().toISOString()).format("DD/MM/yyyy"), error: "End date cant be empty"},
    endingTime: {value: moment(new Date().toISOString()).format("DD/MM/yyyy"), error: "End time cant be empty"},
    venue: {value: "", error: "Venue cant be empty"},
    organizer: {value: "", error: "Organizer cant be empty"},
    genre: {value: "", error: "Venue cant be empty"},
    age: {value: "", error: "Organizer cant be empty"},

};


const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    children: null,
    buttonYes: null,
    buttonNo: null,
}

const initialOpen = {startDate: false, startTime: false, endDate: false, endTime: false}

const AddEvent = (props) => {
    const {event} = props;

    const dispatch = useDispatch();
    const {data: eventDetailsData, loading: eventDetailsLoading, error: eventDetailsError} =
        useSelector((state) => state.getAllEventDetailsReducer);
    const {data: postEventData, loading: postEventLoading, error: postEventError} =
        useSelector((state) => state.postEventDetailsReducer);

    const [user, setUser] = useState(initialLogin);
    const [count, setCount] = useState(0);
    const {onCloseConfirmation, refreshData} = props;
    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [openCalendar, setOpenCalendar] = useState(initialOpen);
    const [venuesList, setVenuesList] = useState([])
    const [organizerList, setOranizerList] = useState([])
    const [genreList, setGenreList] = useState([])
    const [ageList, setAgeList] = useState([])


    useEffect(() => {
        dispatch(getAllEventDetails(event.partnerId));
        setUser({
            title: {value: event.title, error: "Title cant be empty", showError: false},
            state: {value: moment(event.state).format("yyyy-MM-DD"), error: "Start date cant be empty"},
            startingTime: {value: moment(event.state).format("HH:mm:ss"), error: "Starting time cant be empty"},
            city: {value: moment(event.city).format("yyyy-MM-DD"), error: "End date cant be empty"},
            endingTime: {value: moment(event.city).format("HH:mm:ss"), error: "End time cant be empty"},
            venue: {value: event.venue.name, error: "Venue cant be empty"},
            organizer: {value: event.organizer.organizerName, error: "Organizer cant be empty"},
            genre: {value: event.country, error: "Genre cant be empty"},
            age: {value:event.tickets[0].age, error: "Age  cant be empty"},
        })
    }, [])


    const onChange = (e, type) => {
        let data;
        if (type === "state" || type === "startingTime" || type === "city" || type === "endingTime") data = {
            ...user,
            [type]: {...user[type], value: e}
        };
        else data = {...user, [type]: {...user[type], value: e.target.value}};
        setUser(data);
        setCount(count + 1);
    }


    const handleOpenCalendar = (type, value) => {
        setOpenCalendar({...initialOpen, [type]: value})
    }

    useEffect(() => {
        if (postEventError) {
            setConfirmation({
                show: true,
                title: "Error",
                text: postEventError
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo: null
            });
            dispatch(postEventDetailsReset())
        } else if (postEventData) {
            dispatch(postEventDetailsReset())
            setConfirmation({
                show: true,
                title: "Success",
                text: "Event updated",
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation);
                        refreshData();

                    }}>ok</Button>,
                buttonNo: null
            });
        }
    }, [postEventData, postEventLoading])

    useEffect(() => {

        if(eventDetailsError){
            dispatch(getAllEventDetailsReset());
            refreshData();
        }

        if (eventDetailsData) {
            if (eventDetailsData.venues && (eventDetailsData.venues).length>0) {
                const filteredVenues=(eventDetailsData.venues).map((venue)=>({id:venue.id,value:venue.name}))
                setVenuesList(filteredVenues);
            }
            if (eventDetailsData.organizers && (eventDetailsData.organizers).length>0) {
                const filteredOrganizers=(eventDetailsData.organizers).map((organizer)=>({id:organizer.id,value:organizer.organizerName}))
                setOranizerList(filteredOrganizers);
            }

            if (eventDetailsData.liveStream && (eventDetailsData.liveStream).length>0) {
                const filteredGenre=(eventDetailsData.liveStream).map((liveStream)=>liveStream)
                setGenreList(filteredGenre);
            }


            if (eventDetailsData.ageRequirement && (eventDetailsData.ageRequirement).length>0) {
                const filteredList=(eventDetailsData.ageRequirement).map((age)=>age)
                setAgeList(filteredList);
            }

            dispatch(getAllEventDetailsReset())

        }
    }, [eventDetailsData, eventDetailsLoading])


    const handleAddOrganization = (e) => {
        const validate = validateUserInput(user);
        if (validate.isValid) {
            const data = JSON.parse(JSON.stringify(transformValidateObject(validate.data)));
            const newEvent=JSON.parse(JSON.stringify(event));
            newEvent.title=data.title;
            newEvent.state=(moment(data.state+" "+data.startingTime).format());
            newEvent.city=(moment(data.city+" "+data.endingTime).format());
            newEvent.date=(moment(data.city+" "+data.endingTime).format());
            newEvent.country=data.genre;
            newEvent.tickets[0].age=data.age;
            newEvent.venue=(venuesList.find((venue)=>venue.value===data.venue)).id;
            newEvent.organizer=(organizerList.find((organizer)=>organizer.value===data.organizer)).id

            if(new Date(newEvent.state)>=new Date(newEvent.city)){
                setUser({...validate.data,city:{...user.city,showError:true,error:"End date time must be greater than start date time"}})
            }else{
                dispatch(postEventDetails(newEvent))
            }

            //dispatch(postOrganization(data));
        } else {
            setUser(validate.data);
            setCount(count + 1);
        }
    }


    const VenueContainer = venuesList.map((item) => <MenuItem value={item.value}>{item.value}</MenuItem>)
    const organizerContainer = organizerList.map((item) => <MenuItem value={item.value}>{item.value}</MenuItem>)
    const genreContainer = genreList.map((item) => <MenuItem value={item}>{item}</MenuItem>)
    const ageContainer = ageList.map((item) => <MenuItem value={item}>{item}</MenuItem>)



    return (
        <Grid container>
            {( eventDetailsLoading || postEventLoading) && <Loader/>}
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
            <Grid item xs={5.5} style={{marginTop: "20px"}}>
                <CustomTextField label={"Event title"}
                                 onChange={(e) => onChange(e, 'title')}
                                 value={user.title.value}
                                 placeholder={""}
                                 helperText={user.title.showError ? user.title.error : ""}
                                 error={user.title.showError}

                />
            </Grid>
            <Grid item xs={12} style={{marginTop: "20px"}} container justifyContent={"space-between"}>
                <Grid item xs={5.5}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                        <DesktopDatePicker
                            label="Date desktop"
                            open={openCalendar.startDate}
                            onClose={() => handleOpenCalendar('startDate', false)}
                            inputFormat="mm/dd/yyyy"
                            value={user.state.value}
                            onChange={(value) => onChange(moment(value).format("yyyy-MM-DD"), "state")}
                            renderInput={(params) =>
                                (

                                    <CustomTextField label={"Start Date"}
                                                     value={user.state.value}
                                                     params={params}
                                                     helperText={user.state.showError ? user.state.error : ""}
                                                     error={user.state.showError}
                                                     otherInputProps={{
                                                         endAdornment:
                                                             <CalendarTodayIcon style={{
                                                                 color: "black",
                                                                 cursor: "pointer",
                                                                 marginBottom: "10px",
                                                                 fontSize: "18px"
                                                             }}
                                                                                onClick={(e) => handleOpenCalendar('startDate', true)}/>
                                                     }}
                                    />

                                )
                            }
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={5.5}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                        <TimePicker
                            label="Date desktop"
                            open={openCalendar.startTime}
                            onClose={() => handleOpenCalendar('startTime', false)}
                            value={user.startingTime.value}
                            onChange={(value) => onChange(moment(value).format("HH:mm:ss"), "startingTime")}
                            renderInput={(params) =>
                                (

                                    <CustomTextField label={"Start Time"} value={user.startingTime.value}
                                                     params={params}
                                                     otherInputProps={{
                                                         endAdornment:
                                                             <AccessTimeIcon style={{
                                                                 color: "black",
                                                                 cursor: "pointer",
                                                                 marginBottom: "10px",
                                                                 fontSize: "18px"
                                                             }}
                                                                             onClick={(e) => handleOpenCalendar('startTime', true)}/>
                                                     }}
                                    />

                                )
                            }
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{marginTop: "20px"}} container justifyContent={"space-between"}>
                <Grid item xs={5.5}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                        <DesktopDatePicker
                            label="Date desktop"
                            open={openCalendar.endDate}
                            onClose={() => handleOpenCalendar('endingTime', false)}
                            inputFormat="mm/dd/yyyy"
                            value={user.city.value}
                            onChange={(value) => onChange(moment(value).format("yyyy-MM-DD"), "city")}
                            renderInput={(params) =>
                                (

                                    <CustomTextField label={"End Date"}
                                                     value={user.city.value}
                                                     params={params}
                                                     helperText={user.city.showError ? user.city.error : ""}
                                                     error={user.city.showError}
                                                     otherInputProps={{
                                                         endAdornment:
                                                             <CalendarTodayIcon style={{
                                                                 color: "black",
                                                                 cursor: "pointer",
                                                                 marginBottom: "10px",
                                                                 fontSize: "18px"
                                                             }}
                                                                                onClick={(e) => handleOpenCalendar('endDate', true)}/>
                                                     }}
                                    />

                                )
                            }
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={5.5}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                        <TimePicker
                            label="Date desktop"
                            open={openCalendar.endTime}
                            onClose={() => handleOpenCalendar('endTime', false)}
                            value={user.endingTime.value}
                            onChange={(value) => onChange(moment(value).format("HH:mm:ss"), "endingTime")}
                            renderInput={(params) =>
                                (

                                    <CustomTextField label={"End Time"} value={user.endingTime.value}
                                                     params={params}
                                                     otherInputProps={{
                                                         endAdornment:
                                                             <AccessTimeIcon style={{
                                                                 color: "black",
                                                                 cursor: "pointer",
                                                                 marginBottom: "10px",
                                                                 fontSize: "18px"
                                                             }}
                                                                             onClick={(e) => handleOpenCalendar('endTime', true)}/>
                                                     }}
                                    />

                                )
                            }
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} container justifyContent={"space-between"}>
                    <Grid item xs={5.5} style={{marginTop: "20px"}} contaier direction={"column"}>
                        <CustomLabelHeader text={"Venue"} color={"black"}/>
                        <CustomDropdown
                            value={user.venue.value}
                            onChange={(e) => onChange(e, "venue")}
                            container={VenueContainer}
                            showError={user.venue.showError}
                            error={user.venue.error}
                        />
                    </Grid>
                    <Grid item xs={5.5} style={{marginTop: "20px"}} contaier direction={"column"}>
                        <CustomLabelHeader text={"Organizer"} color={"black"}/>
                        <CustomDropdown
                            value={user.organizer.value}
                            onChange={(e) => onChange(e, "organizer")}
                            container={organizerContainer}
                            showError={user.organizer.showError}
                            error={user.organizer.error}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} container justifyContent={"space-between"}>
                <Grid item xs={5.5} style={{marginTop: "20px"}} contaier direction={"column"}>
                    <CustomLabelHeader text={"Genre"} color={"black"}/>
                    <CustomDropdown
                        value={user.genre.value}
                        onChange={(e) => onChange(e, "genre")}
                        container={genreContainer}
                        showError={user.genre.showError}
                        error={user.genre.error}
                    />
                </Grid>
                <Grid item xs={5.5} style={{marginTop: "20px"}} contaier direction={"column"}>
                    <CustomLabelHeader text={"Age requirement"} color={"black"}/>
                    <CustomDropdown
                        value={user.age.value}
                        onChange={(e) => onChange(e, "age")}
                        container={ageContainer}
                        showError={user.age.showError}
                        error={user.age.error}
                    />
                </Grid>
            </Grid>

            <Grid item xs={12} container justifyContent={"flex-end"} style={{marginTop: "40px"}} spacing={2}>
                <Grid item onClick={handleAddOrganization}>
                    <CustomButtonSquareSmall text={"OK"}/>
                </Grid>
                <Grid item onClick={onCloseConfirmation}>
                    <CustomButtonSquareSmall text={"Cancel"} color={"red"}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AddEvent;