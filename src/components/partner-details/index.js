import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllUsers, getPartnerDetails} from "../../services";
import Grid from "@mui/material/Grid/Grid";
import React from "react";
import {CustomLabelHeader, CustomLabelHeaderLogin, CustomLabelNormal20} from "../common/CustomLabel";
import moment from "moment";
import Loader from "../common/Loader";
import {deletePartnerByIdReset, getAllPartnersReset, getPartnerDetailsReset} from "../../reducers";


const PartnerDetails=(props)=>{
    const dispatch = useDispatch()
    const {partnerId}=props;
    const {data, loading, error} = useSelector((state) => state.getPartnerDetailsReducer);



    useEffect(()=>{
        dispatch(getPartnerDetails(partnerId));
        return function cleanup() {
            dispatch(getPartnerDetailsReset());
        };
    },[])


    let reservations=(data && data.data && data.data.reservations && JSON.parse(JSON.stringify(data.data.reservations))) || [];
    let paymentInfo=(data && data.data && data.data.partnerPayment && (data.data.partnerPayment).length>0
        && JSON.parse(JSON.stringify(data.data.partnerPayment[0]))) || null;

    if(reservations.length>0){
        reservations=reservations.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
        })
    }
    const containersData= reservations.map((reservation)=>
        <Grid container justifyContent={"space-between"} style={{marginTop:"10px"}}>
            <Grid item xs={3.5}>
                <CustomLabelNormal20 text={moment(reservation.date).format("MMM Do YYYY")} fontWeight={"bold"}/>
            </Grid>
            <Grid item xs={3.5}>
                <CustomLabelNormal20 text={reservation.title} fontWeight={"bold"}/>
            </Grid>
            <Grid item xs={3.5}>
                <CustomLabelNormal20 text={`$${(reservation.allReservationCredit).toFixed(2)}`} fontWeight={"bold"}/>
            </Grid>
        </Grid>
    )


    return(
        <Grid container justifyContent={{xs:"center",md:"space-between"}}>
            {(loading) && <Loader/>}

            <Grid item xs={11} container direction={"column"}>
               <Grid item>
                   <CustomLabelHeaderLogin text={"Payout Information"} fontWeight={"bold"}/>
               </Grid>
               <Grid item style={{marginTop:"10px"}}>
                   <Grid container justifyContent={"space-between"}>
                       <Grid item xs={3.5}>
                           <CustomLabelNormal20 text={"Date"} fontWeight={"bold"}/>
                       </Grid>
                       <Grid item xs={3.5}>
                           <CustomLabelNormal20 text={"Event"} fontWeight={"bold"}/>
                       </Grid>
                       <Grid item xs={3.5}>
                           <CustomLabelNormal20 text={"Payout"} fontWeight={"bold"}/>
                       </Grid>
                   </Grid>
               </Grid>
               {reservations.length>0 && containersData}
                {
                    (reservations.length<=0 && !loading) &&
                        <Grid container justifyContent={"center"} style={{marginTop:"40px"}}>
                            <CustomLabelNormal20 text={"No reservation found"} fontWeight={"bold"}/>
                        </Grid>
                }
           </Grid>
            <Grid item  xs={11} container direction={"column"} style={{marginTop:"40px"}}>
                <Grid item>
                    <CustomLabelHeaderLogin text={"Payment Info"} fontWeight={"bold"}/>
                </Grid>
                <Grid item style={{marginTop:"10px"}}>
                    <Grid container direction={"column"}>
                        <Grid container>
                            <Grid item>
                                <CustomLabelNormal20 text={"Beneficiary Name : "} fontWeight={"bold"}/>
                            </Grid>
                            <Grid item style={{marginLeft:"10px"}}>
                                <CustomLabelNormal20 text={paymentInfo && paymentInfo.beneficiary_name} fontWeight={"bold"}/>
                            </Grid>
                        </Grid>
                        <Grid container style={{marginTop:"10px"}}>
                            <Grid item>
                                <CustomLabelNormal20 text={"Routing Number : "} fontWeight={"bold"}/>
                            </Grid>
                            <Grid item style={{marginLeft:"10px"}}>
                                <CustomLabelNormal20 text={paymentInfo &&paymentInfo.routing_number} fontWeight={"bold"}/>
                            </Grid>
                        </Grid>
                        <Grid container style={{marginTop:"10px"}}>
                            <Grid item>
                                <CustomLabelNormal20 text={"Account Number : "} fontWeight={"bold"}/>
                            </Grid>
                            <Grid item style={{marginLeft:"10px"}}>
                                <CustomLabelNormal20 text={paymentInfo && paymentInfo.account_number} fontWeight={"bold"}/>
                            </Grid>
                        </Grid>
                        <Grid container style={{marginTop:"10px"}}>
                            <Grid item>
                                <CustomLabelNormal20 text={"Currency : "} fontWeight={"bold"}/>
                            </Grid>
                            <Grid item style={{marginLeft:"10px"}}>
                                <CustomLabelNormal20 text={paymentInfo && paymentInfo.currency} fontWeight={"bold"}/>
                            </Grid>
                        </Grid>
                        <Grid container style={{marginTop:"10px"}}>
                            <Grid item>
                                <CustomLabelNormal20 text={"Tax Number : "} fontWeight={"bold"}/>
                            </Grid>
                            <Grid item style={{marginLeft:"10px"}}>
                                <CustomLabelNormal20 text={paymentInfo && paymentInfo.tax_number} fontWeight={"bold"}/>
                            </Grid>
                        </Grid>
                        <Grid container style={{marginTop:"10px"}}>
                            <Grid item>
                                <CustomLabelNormal20 text={"Type : "} fontWeight={"bold"}/>
                            </Grid>
                            <Grid item style={{marginLeft:"10px"}}>
                                <CustomLabelNormal20 text={paymentInfo && paymentInfo.type} fontWeight={"bold"}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}

export default PartnerDetails;