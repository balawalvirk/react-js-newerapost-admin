import {CustomTextField} from "../common/text";
import Grid from "@mui/material/Grid/Grid";
import React, {useEffect, useState} from "react";
import {CustomButtonSquareSmall} from "../common/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {
    postOrganizationReset,
    updatePasswordAdminReducer,
    updatePasswordAdminReset,
    updateRevenueApiReset
} from "../../reducers";
import Button from "@mui/material/Button/Button";
import {removeAccessToken, transformValidateObject, validateUserInput} from "../../utils";
import {postOrganization, updatePasswordAdminApi, updateRevenueApi} from "../../services";
import Loader from "../common/Loader";
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import {useLocation, useNavigate, Outlet} from "react-router-dom"

const initialPassword = {
    revenue: {value: null, error: "Revenue cant be empty", showError: false},
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

const UpdateRevenue = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const [user, setUser] = useState(initialPassword);
    const [count, setCount] = useState(0);
    const {data, loading, error} = useSelector((state) => state.updateRevenueApiSliceReducer);
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
            dispatch(updateRevenueApiReset())
        } else if (data) {

            setConfirmation({
                show: true,
                title: "Success",
                text: "Revenue updated successfully"
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation);
                    }}>ok</Button>,
                buttonNo: null
            });

            dispatch(updateRevenueApiReset());

        }
    }, [data, loading])


    const handleUpdateRevenue = (e) => {
        const validate = validateUserInput(user);
        if (validate.isValid) {
            dispatch(updateRevenueApi({total:parseInt(user.revenue.value)}));
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
                    <CustomTextField label={"Revenue"}
                                     onChange={(e) => onChange(e, 'revenue')}
                                     error={user.revenue.showError}
                                     value={user.revenue.value}
                                     placeholder={""}
                                     type={"number"}
                                     helperText={user.revenue.showError ? user.revenue.error : ""}
                    />
                </Grid>

                <Grid item style={{marginTop:'10px'}}>
                    <Grid item onClick={handleUpdateRevenue}>
                        <CustomButtonSquareSmall text={"Update Revenue"}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}


export default UpdateRevenue;
