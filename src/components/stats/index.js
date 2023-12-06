import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import {CustomLabelHeader, CustomLabelHeaderLogin} from "src/components/common/CustomLabel";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button/Button";
import {removeAccessToken, saveToken} from "../../utils";
import {getUserStatsReset, validateUserSliceReset} from "src/reducers";
import Loader from "src/components/common/Loader";
import {getUserStats} from "src/services";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import {PieChart} from '@mui/x-charts/PieChart';


const Stats = (props) => {
    const dispatch = useDispatch();
    const {data, loading, error} = useSelector((state) => state.getUserStatsSliceReducer);
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserStats());
        return function cleanup() {
            dispatch(getUserStatsReset());
        };
    }, [])

    useEffect(() => {
        if (error) {
            if (error === "Please authenticate") {
                removeAccessToken();
                navigate(`/login`)
            }
        }
    }, [data, loading]);

    return (
        <Grid item xs={11} container style={{marginTop: "10px"}} spacing={2}>
            {(loading) && <Loader/>}

            <Grid container justifyContent={"space-between"} style={{marginTop:20}}>
            <Grid container xs={5.8}>
                <Paper style={{width: "100%",padding:"10px"}}>

                    <Grid container justifyContent={"left"}>
                        <CustomLabelHeader text={'Subscription'} color={"#1e1e2d"} fontWeight={"bold"}/>
                    </Grid>

                    <Grid item container alignItems={"flex-start"} justifyContent={"flex-start"}>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        {id: 0, value: 10, label: 'The Fundamentals'},
                                        {id: 1, value: 15, label: 'All-in-One'},
                                        {id: 2, value: 20, label: 'None'},
                                    ],
                                    cx: 100,
                                    cy: 100,

                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </Grid>
                </Paper>
            </Grid>
            <Grid container xs={5.8}>
                <Paper style={{width: "100%",padding:"10px"}}>

                    <Grid container justifyContent={"left"}>
                        <CustomLabelHeader text={'User'} color={"#1e1e2d"} fontWeight={"bold"}/>
                    </Grid>

                    <Grid item container alignItems={"flex-start"} justifyContent={"flex-start"}>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        {id: 0, value: 10, label: 'Tattoo Shops'},
                                        {id: 1, value: 15, label: 'Axe Throwing'},
                                        {id: 2, value: 20, label: 'Rage Rooms'},
                                        {id: 3, value: 20, label: 'Trampoline Parks'},
                                        {id: 3, value: 20, label: 'Others'},

                                    ],
                                    cx: 100,
                                    cy: 100,

                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </Grid>
                </Paper>
            </Grid>
            </Grid>
        </Grid>
    )
}

export default Stats;
