import {useLocation, useNavigate, Outlet} from "react-router-dom"
import {useEffect, useState} from "react";
import React from "react";
import BackgroundImage from "src/assets/images/background-waive-pro.jpg";
import HeaderLogo from "src/assets/images/logo.png";
import Grid from "@mui/material/Grid/Grid";
import {CustomLabelHeaderLarge} from "src/components/common/CustomLabel";
import {CustomLabelHeader, CustomLabelNormal13} from "../common/CustomLabel";
import {CustomTextField} from "../common/text";
import {CustomButtonLarge} from "../common/CustomButton";
import {validateUserInput,transformValidateObject} from "src/utils";
import Loader from "../common/Loader";
import {useDispatch, useSelector} from "react-redux";
import {validateAdmin} from "../../services";
import ResponsiveConfirmationDialog from "src/components/common/ResponsiveConfirmation";
import Button from "@mui/material/Button/Button";
import {saveToken,getToken} from "src/utils";
import {validateUserSliceReset} from "../../reducers";
const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}

const initialLogin = {
    username: {value: null, error: "Username cant be empty", showError: false},
    password: {value: null, error: "Password cant be empty", showError: false},
};

const Login = () => {
    const dispatch = useDispatch()
    const [confirmation, setConfirmation] = useState(initialConfirmation);




    const [user,setUser]=useState(initialLogin);
    const [count,setCount]=useState(0);
    const {data, loading, error} = useSelector((state) => state.validateUserReducer);

    const location = useLocation().pathname;
    let navigate = useNavigate();


    useEffect(()=>{
        return function cleanup() {
            dispatch(validateUserSliceReset());
        };
    },[])



    useEffect(() => {
        if(error){
            setConfirmation({
                show: true,
                title: "Error",
                text: "Invalid Username or password"
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(validateUserSliceReset())
        }else if(data){

            console.log("data = ",data);
            const user=data.data;

            saveToken(JSON.stringify(user.access_token));
            navigate('/home',{replace: true});
            dispatch(validateUserSliceReset())

        }
    }, [data,loading, error]);

    const onChange = (e, type) => {
        let data;
        data = {...user, [type]: {...user[type], value: e.target.value}};
        setUser(data);
        setCount(count + 1);
    }


    const handleValidateUser = (e) => {
        const validate = validateUserInput(user);
        if (validate.isValid) {
            const data = transformValidateObject(validate.data)
            dispatch(validateAdmin(data));
        } else {
            setUser(validate.data);
            setCount(count + 1);
        }
    }


    return (
        <Grid container style={{width: "100%", height: "99%"}}>
            {(loading) && <Loader/>}
            {
                confirmation.show &&
                <ResponsiveConfirmationDialog
                    title={confirmation.title} text={confirmation.text}
                    buttons={confirmation.buttonYes}
                    otherButton={confirmation.buttonNo}
                />
            }
            <Grid item xs={0} md={5.8} container style={{position: "relative"}}>
                <Grid item xs={12} container style={{padding: "20px"}} alignItems={"space-between"}>
                    <Grid item xs={12} style={{position: "relative", zIndex: 4}}>
                        {/*<img src={HeaderLogo} style={{height: "70px"}}/>*/}
                    </Grid>
                    <Grid xs={12} item style={{position: "relative", zIndex: 4}}>
                        <CustomLabelHeaderLarge text={"Welcome to Newerapost Admin Panel!"} color={"#ffffff"}/>
                    </Grid>
                </Grid>
                <Grid item style={{width: "100%", height: "100%", position: "absolute", top: 0, zIndex: 0}}>
                    <img src={BackgroundImage}
                         style={{width: "100%", height: "100%", position: "absolute", top: 0, zIndex: 0}}/>
                </Grid>
            </Grid>
            <Grid item xs={0} md={0.4}></Grid>
            <Grid item xs={12} md={5.8} container justifyContent={"center"} sx={{height:{xs:"auto",md:"100%"}}} alignItems={"center"}>
                <Grid item xs={10} container alignItems={"center"}>
                    <Grid item xs={12} container justifyContent={"center"}>
                        <CustomLabelHeaderLarge text={"Login Account"} color={"black"} fontWeight={"bold"}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"center"}>
                        <CustomLabelNormal13 text={"Enter your email and password"} color={"#b5b5c3"}/>
                    </Grid>
                    <Grid item xs={12} style={{marginTop:"20px"}}>
                        <CustomTextField label={"Username"}
                                         onChange={(e) => onChange(e, 'username')}
                                         error={user.username.showError}
                                         value={user.username.value}
                                         placeholder={""}
                                         helperText={user.username.showError ? user.username.error : ""}
                        />
                    </Grid>
                    <Grid item xs={12}  style={{marginTop:"20px"}}>
                        <CustomTextField label={"Password"}
                                         onChange={(e) => onChange(e, 'password')}
                                         error={user.password.showError}
                                         value={user.password.value}
                                         type={"password"}
                                         placeholder={""}
                                         helperText={user.password.showError ? user.password.error : ""}/>
                    </Grid>
                    <Grid item container justifyContent={"flex-end"}>
                        <Grid item xs={4} style={{marginTop:"30px"}} onClick={handleValidateUser}>
                        <CustomButtonLarge text={"Sign In"}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Login;
