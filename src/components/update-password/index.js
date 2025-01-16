import {CustomTextField} from "../common/text";
import Grid from "@mui/material/Grid/Grid";
import React, {useEffect, useState} from "react";
import {CustomButtonSquareSmall} from "../common/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {postOrganizationReset, updatePasswordAdminReducer, updatePasswordAdminReset} from "../../reducers";
import Button from "@mui/material/Button/Button";
import {removeAccessToken, transformValidateObject, validateUserInput} from "../../utils";
import {postOrganization, updatePasswordAdminApi} from "../../services";
import Loader from "../common/Loader";
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import {useLocation, useNavigate, Outlet} from "react-router-dom"

const initialPassword = {
    current_password: {value: null, error: "Password cant be empty", showError: false},
    new_password: {value: null, error: "Password cant be empty", showError: false},
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

const UpdatePassword = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const [user, setUser] = useState(initialPassword);
    const [count, setCount] = useState(0);
    const {data, loading, error} = useSelector((state) => state.updatePasswordAdminReducer);
    const [confirmation, setConfirmation] = useState(initialConfirmation);

    const onChange = (e, type) => {
        let data;
        data = {...user, [type]: {...user[type], value: e.target.value}};
        setUser(data);
        setCount(count + 1);
    }


    const handleLogout=(e)=>{
        removeAccessToken();
        navigate(`/login`)
    }

    useEffect(() => {
        if (error) {
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
                buttonNo: null
            });
            dispatch(updatePasswordAdminReset())
        } else if (data) {

            setConfirmation({
                show: true,
                title: "Success",
                text: "Password updated successfully"
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation);
                        handleLogout();
                    }}>ok</Button>,
                buttonNo: null
            });

            dispatch(updatePasswordAdminReset());

        }
    }, [data, loading])


    const handleUpdatePassword = (e) => {
        const validate = validateUserInput(user);
        if (validate.isValid) {
            dispatch(updatePasswordAdminApi(transformValidateObject(validate.data)));
        } else {
            setUser(validate.data);
            setCount(count + 1);
        }
    }


    return (
        <Grid container justifyContent={"center"} alignItems={"center"}>
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
            {(loading) && <Loader/>}

            <Grid item xs={6} style={{marginTop:'20px'}}>
                <Grid item>
                    <CustomTextField label={"Current Password"}
                                     onChange={(e) => onChange(e, 'current_password')}
                                     error={user.current_password.showError}
                                     value={user.current_password.value}
                                     placeholder={""}
                                     helperText={user.current_password.showError ? user.current_password.error : ""}
                    />
                </Grid>


                <Grid item>
                    <CustomTextField label={"New Password"}
                                     onChange={(e) => onChange(e, 'new_password')}
                                     error={user.new_password.showError}
                                     value={user.new_password.value}
                                     placeholder={""}
                                     helperText={user.new_password.showError ? user.new_password.error : ""}
                    />
                </Grid>

                <Grid item style={{marginTop:'10px'}}>
                    <Grid item onClick={handleUpdatePassword}>
                        <CustomButtonSquareSmall text={"Update Password"}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}


export default UpdatePassword;
