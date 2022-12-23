import {useLocation, useNavigate, Outlet} from "react-router-dom"
import {useEffect, useState} from "react";
import React from "react";
import BackgroundImage from "src/assets/images/hero-background.png";
import HeaderLogo from "src/assets/images/header-logo.png";
import Grid from "@mui/material/Grid/Grid";
import {CustomLabelHeaderLarge} from "src/components/common/CustomLabel";
import {CustomLabelHeader, CustomLabelHeaderLogin, CustomLabelNormal13} from "../common/CustomLabel";
import {CustomTextField} from "../common/text";
import {CustomButtonLarge} from "../common/CustomButton";
import LogoImage from "src/assets/images/logo-with-trademark.png";
import Paper from "@mui/material/Paper/Paper";
import MenuIcon from '@mui/icons-material/Menu';
import Divider from "@mui/material/Divider/Divider";
import Stats from "src/components/stats";
import ListViewer from "src/components/common/ListViewer";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Users from "../users";
import {isMobile} from 'react-device-detect';
import OrganizerPartner from "../organizer-partner";
import Events from "../events";
import Organization from "../organization";
import Notification from "../notification";
import {removeAccessToken} from "../../utils";
import StaticDataEditor from "../static-data-editor";

const Home = () => {
    const location = useLocation().pathname;
    let navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(true);
    const [tab,setTab]=useState("Dashboard");

    useEffect(()=>{
        setShowMenu(isMobile?false:true);
    },[])


    const handleMenu = (e) => {
        setShowMenu(!showMenu)
    }

    const handleTab = (tab) => {
        setTab(tab);
    }

    const handleLogout=(e)=>{
        removeAccessToken();
        navigate(`/login`)
    }



    return (
        <Grid container style={{width: "100%", height: "99%"}}>
            {showMenu &&
            <Grid item xs={4} md={2}
                  sx={{zIndex:1,height: "100%", background: "#1e1e2d", position: {xs: "absolute", md: "initial"}}}>
                <Grid container item xs={12} justifyContent={"center"} style={{marginTop: "20px"}}>
                    <img src={LogoImage} style={{width: "80%"}}/>
                </Grid>
                <Grid container item xs={12} style={{marginTop: "40px", padding: "0px 10px"}}>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={(e)=>handleTab("Dashboard")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Dashboard"?1:0.9}}>
                        <CustomLabelHeader text={"Dashboard"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={(e)=>handleTab("Users")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Users"?1:0.9}}>
                        <CustomLabelHeader text={"Users"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={(e)=>handleTab("Organizers/Partner")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Organizers/Partner"?1:0.9}}>
                        <CustomLabelHeader text={"Organizers/Partner"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={(e)=>handleTab("Events")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Events"?1:0.9}}>
                        <CustomLabelHeader text={"Events"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={(e)=>handleTab("Organization")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Organization"?1:0.9}}>
                        <CustomLabelHeader text={"Organization"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={(e)=>handleTab("Notifications")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Notifications"?1:0.9}}>
                        <CustomLabelHeader text={"Notifications"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={(e)=>handleTab("Privacy Policy")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Privacy Policy"?1:0.9}}>
                        <CustomLabelHeader text={"Privacy Policy"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={(e)=>handleTab("About us")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="About us"?1:0.9}}>
                        <CustomLabelHeader text={"About us"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={handleLogout}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Notifications"?1:0.9}}>
                        <CustomLabelHeader text={"Logout"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                </Grid>
            </Grid>
            }
            <Grid item xs={12} md={showMenu ? 10 : 12}>
                <Grid item xs={12}>
                    <Paper style={{height: "100%", padding: "20px",zIndex:-1}}>
                        <Grid container alignItems={"center"}>
                            <Grid item style={{cursor: "pointer"}} onClick={handleMenu}
                                  sx={{display: {xs: "none", md: "block"}}} xs={1}>
                                <MenuIcon style={{color: "#1e1e2d"}}/>
                            </Grid>
                            <Grid item xs={12} md={11} container justifyContent={"space-between"} alignItems={"center"}>
                                <Grid item md={12}>
                                    <Grid container justifyContent={"center"}>
                                        <CustomLabelHeaderLogin text={tab} color={"#1e1e2d"} fontWeight={"bold"}/>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{display: {xs: "block", md: "none"}}} onClick={handleMenu}>
                                    <MenuIcon style={{color: "#1e1e2d"}}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} container justifyContent={"center"}>
                    {
                        tab==="Dashboard" && <Stats/>
                    }
                    {
                        tab==="Users" && <Users/>
                    }
                    {
                        tab==="Organizers/Partner" && <OrganizerPartner/>
                    }
                    {
                        tab==="Events" && <Events/>
                    }
                    {
                        tab==="Organization" && <Organization/>
                    }
                    {
                        tab==="Notifications" && <Notification/>
                    }
                    {
                        tab==="Privacy Policy" && <StaticDataEditor type={"privacy-policy"}/>
                    }
                    {
                        tab==="About us" && <StaticDataEditor type={"about-us"}/>
                    }
                    {/*<Stats/>*/}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home;