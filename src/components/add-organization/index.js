import {CustomTextField} from "../common/text";
import Grid from "@mui/material/Grid/Grid";
import React, {useEffect, useState} from "react";
import {transformValidateObject, validateUserInput} from "../../utils";
import {postOrganization, validateAdmin} from "../../services";
import {CustomButtonSquareSmall} from "../common/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button/Button";
import {deleteEventReset, getAllEventsReset, postOrganizationReset, updateEvent} from "../../reducers";
import Loader from "../common/Loader";

const initialLogin = {
    name: {value: null, error: "Name cant be empty", showError: false},
    type: {value: null, error: "Type cant be empty", showError: false},
};


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
const AddOrganization = (props) => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.postOrganizationReducer);
    const [user, setUser] = useState(initialLogin);
    const [count,setCount]=useState(0);
    const {onCloseConfirmation,refreshData}=props;
    const [confirmation, setConfirmation] = useState(initialConfirmation);

    const onChange = (e, type) => {
        let data;
        data = {...user, [type]: {...user[type], value: e.target.value}};
        setUser(data);
        setCount(count + 1);
    }


    useEffect(()=>{
        if(error){
            setConfirmation({
                show: true,
                title: "Error",
                text: error
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(postOrganizationReset())
        }else if(data){
            refreshData();
            dispatch(postOrganizationReset());

        }
    },[data,loading])

    const handleAddOrganization = (e) => {
        const validate = validateUserInput(user);
        if (validate.isValid) {
            const data = transformValidateObject(validate.data);
            dispatch(postOrganization(data));
        } else {
            setUser(validate.data);
            setCount(count + 1);
        }
    }


    return (
        <Grid container>
            {(loading) && <Loader/>}
            <Grid item xs={12} style={{marginTop: "20px"}}>
                <CustomTextField label={"Name"}
                                 onChange={(e) => onChange(e, 'name')}
                                 error={user.name.showError}
                                 value={user.name.value}
                                 placeholder={""}
                                 helperText={user.name.showError ? user.name.error : ""}
                />
            </Grid>
            <Grid item xs={12} style={{marginTop: "20px"}}>
                <CustomTextField label={"Type"}
                                 onChange={(e) => onChange(e, 'type')}
                                 error={user.type.showError}
                                 value={user.type.value}
                                 placeholder={""}
                                 helperText={user.type.showError ? user.type.error : ""}
                />
            </Grid>
            <Grid item xs={12} container justifyContent={"flex-end"} style={{marginTop:"40px"}} spacing={2}>
                <Grid item onClick={handleAddOrganization}>
                    <CustomButtonSquareSmall text={"OK"}/>
                </Grid>
                <Grid item onClick={onCloseConfirmation}>
                    <CustomButtonSquareSmall text={"Cancel"} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AddOrganization;