import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import {CustomLabelHeader} from "src/components/common/CustomLabel";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button/Button";
import {removeAccessToken, saveToken} from "../../utils";
import {getUserStatsReset, validateUserSliceReset} from "src/reducers";
import Loader from "src/components/common/Loader";
import {getUserStats} from "src/services";
import {useLocation, useNavigate, Outlet} from "react-router-dom"


const Stats=(props)=>{
    const dispatch = useDispatch();
    const {data, loading, error} = useSelector((state) => state.getUserStatsSliceReducer);
    let navigate = useNavigate();

    useEffect(()=>{
        dispatch(getUserStats());
        return function cleanup() {
            dispatch(getUserStatsReset());
        };
    },[])

    useEffect(()=>{
        if(error){
            if(error==="Please authenticate"){
                removeAccessToken();
                navigate(`/login`)
            }
        }
    },[data,loading]);

    return(
        <Grid item xs={11} container style={{marginTop: "10px"}} spacing={2}>
            {(loading) && <Loader/>}
            <Grid item xs={4}>
                <Paper style={{width: "100%", padding: "20px 0px"}}>
                    <Grid container justifyContent={"center"} alignItems={"center"} direction={"column"}>
                        <Grid item>
                            <CustomLabelHeader text={"Users"} color={"#1e1e2d"}
                                               fontWeight={"bold"}/>

                        </Grid>
                        <Grid item>
                            <CustomLabelHeader text={data && data.userCount} color={"#1e1e2d"}/>

                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper style={{width: "100%", padding: "20px 0px"}}>
                    <Grid container justifyContent={"center"} alignItems={"center"} direction={"column"}>
                        <Grid item>
                            <CustomLabelHeader text={"Partner"} color={"#1e1e2d"}
                                               fontWeight={"bold"}/>

                        </Grid>
                        <Grid item>
                            <CustomLabelHeader text={data && data.partnerCount} color={"#1e1e2d"}/>

                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper style={{width: "100%", padding: "20px 0px"}}>
                    <Grid container justifyContent={"center"} alignItems={"center"} direction={"column"}>
                        <Grid item>
                            <CustomLabelHeader text={"Subscriptions"} color={"#1e1e2d"}
                                               fontWeight={"bold"}/>

                        </Grid>
                        <Grid item>
                            <CustomLabelHeader text={data && data.subscriptionCount} color={"#1e1e2d"}/>

                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper style={{width: "100%", padding: "20px 0px"}}>
                    <Grid container justifyContent={"center"} alignItems={"center"} direction={"column"}>
                        <Grid item>
                            <CustomLabelHeader text={"Events"} color={"#1e1e2d"}
                                               fontWeight={"bold"}/>

                        </Grid>
                        <Grid item>
                            <CustomLabelHeader text={data && data.eventsCount} color={"#1e1e2d"}/>

                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper style={{width: "100%", padding: "20px 0px"}}>
                    <Grid container justifyContent={"center"} alignItems={"center"} direction={"column"}>
                        <Grid item>
                            <CustomLabelHeader text={"Reservations"} color={"#1e1e2d"}
                                               fontWeight={"bold"}/>

                        </Grid>
                        <Grid item>
                            <CustomLabelHeader text={data && data.reservationCount} color={"#1e1e2d"}/>

                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper style={{width: "100%", padding: "20px 0px"}}>
                    <Grid container justifyContent={"center"} alignItems={"center"} direction={"column"}>
                        <Grid item>
                            <CustomLabelHeader text={"Organizers"} color={"#1e1e2d"}
                                               fontWeight={"bold"}/>

                        </Grid>
                        <Grid item>
                            <CustomLabelHeader text={data && data.organizersCount} color={"#1e1e2d"}/>

                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper style={{width: "100%", padding: "20px 0px"}}>
                    <Grid container justifyContent={"center"} alignItems={"center"} direction={"column"}>
                        <Grid item>
                            <CustomLabelHeader text={"Venues"} color={"#1e1e2d"}
                                               fontWeight={"bold"}/>

                        </Grid>
                        <Grid item>
                            <CustomLabelHeader text={data && data.venueCount} color={"#1e1e2d"}/>

                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper style={{width: "100%", padding: "20px 0px"}}>
                    <Grid container justifyContent={"center"} alignItems={"center"} direction={"column"}>
                        <Grid item>
                            <CustomLabelHeader text={"Organizations"} color={"#1e1e2d"}
                                               fontWeight={"bold"}/>

                        </Grid>
                        <Grid item>
                            <CustomLabelHeader text={data && data.organizationCount} color={"#1e1e2d"}/>

                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Stats;