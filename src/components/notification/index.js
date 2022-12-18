import Loader from "../common/Loader";
import Grid from "@mui/material/Grid/Grid";
import {CustomTextField} from "../common/text";
import {CustomButtonSquareSmall} from "../common/CustomButton";
import React, {useEffect, useState} from "react";
import {CustomDropdown} from "../common/CustomDrowDown";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {transformValidateObject, validateUserInput} from "../../utils";
import {sendFirebasePushNotifications, validateAdmin} from "../../services";
import {useDispatch, useSelector} from "react-redux";
import {
    blockUnblockReset,
    sendFirebasePushNotificationsReducer,
    sendFirebasePushNotificationsReset,
    updateUser
} from "../../reducers";
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import Button from "@mui/material/Button/Button";

const initialLogin = {
    title: {value: null, error: "Title cant be empty", showError: false},
    body: {value: null, error: "Body cant be empty", showError: false},
    type: {value: null, error: "Type cant be empty", showError: false}

};

const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}

const Notification = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(initialLogin);
    const [count, setCount] = useState(0);
    const {data, loading, error} = useSelector((state) => state.sendFirebasePushNotificationsReducer);
    const [confirmation, setConfirmation] = useState(initialConfirmation);


    useEffect(()=>{
        if(error){
            setConfirmation({
                show: true,
                title: "Error",
                text: error,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(sendFirebasePushNotificationsReset())
        }else if(data){

            dispatch(sendFirebasePushNotificationsReset())

        }
    },[data,loading,error])


    const onChange = (e, type) => {
        let data;
        data = {...user, [type]: {...user[type], value: e.target.value}};
        setUser(data);
        setCount(count + 1);
    }

    const onSendNotification = (e) => {
        const validate = validateUserInput(user);
        if (validate.isValid) {
            const data = transformValidateObject(validate.data)
            dispatch(sendFirebasePushNotifications(data));
        } else {
            setUser(validate.data);
            setCount(count + 1);
        }
    }

    const TypeContainer = ["User", "Organizers/partners"].map((item) => <MenuItem value={item}>{item}</MenuItem>)


    return (
        <>
            {(loading) && <Loader/>}
            {
                confirmation.show &&
                <ResponsiveConfirmationDialog
                    title={confirmation.title} text={confirmation.text}
                    buttons={confirmation.buttonYes}
                    otherButton={confirmation.buttonNo}
                />
            }
            <Grid container xs={11} md={8} lg={6}>

                <Grid item xs={12} style={{marginTop: "20px"}}>
                    <CustomTextField label={"Title"}
                                     onChange={(e) => onChange(e, 'title')}
                                     error={user.title.showError}
                                     value={user.title.value}
                                     placeholder={""}
                                     helperText={user.title.showError ? user.title.error : ""}
                    />
                </Grid>
                <Grid item xs={12} style={{marginTop: "20px"}}>
                    <CustomTextField label={"Body"}
                                     onChange={(e) => onChange(e, 'body')}
                                     error={user.body.showError}
                                     value={user.body.value}
                                     placeholder={""}
                                     helperText={user.body.showError ? user.body.error : ""}
                    />
                </Grid>
                <Grid item xs={12} style={{marginTop: "20px"}}>

                    <CustomDropdown
                        value={user.type.value}
                        onChange={(e) => onChange(e, "type")}
                        container={TypeContainer}
                        showError={user.type.showError}
                        error={user.type.error}
                    />
                </Grid>
                <Grid item xs={12} container justifyContent={"flex-end"} style={{marginTop: "20px"}} spacing={2}>
                    <Grid item onClick={onSendNotification}>
                        <CustomButtonSquareSmall text={"Send"}/>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Notification;