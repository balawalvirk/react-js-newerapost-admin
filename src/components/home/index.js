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
import LogoImage from "src/assets/images/logo.png";
import Paper from "@mui/material/Paper/Paper";
import MenuIcon from '@mui/icons-material/Menu';
import Divider from "@mui/material/Divider/Divider";
import Stats from "src/components/stats";
import ListViewer from "src/components/common/ListViewer";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Users from "../users";
import {removeAccessToken} from "../../utils";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const Home = () => {
    const location = useLocation().pathname;
    let navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(true);
    const [tab,setTab]=useState("Dashboard");
    const theme = useTheme();

    useEffect(()=>{
        setShowMenu(isMobile?false:true);
        navigate('dashboard')
    },[])


    useEffect(()=>{
        if(location==="/home"){
            navigate('/home/dashboard')

        }
    },[location])

    useEffect(()=>{

        console.log("users = ",tab)
        if(tab==="Users"){
            navigate('/home/user')
        }else if(tab==="Dashboard"){
            navigate('/home/dashboard')

        }else if(tab==="Waivers"){
            navigate('/home/waiver')

        }else if(tab==="Experiences"){
            navigate('/home/experience')

        }else if(tab==="Groups"){
            navigate('/home/group')

        }else if(tab==="Game Masters"){
            navigate('/home/game-master')

        }else if(tab==="Privacy Policy"){
            navigate('/home/privacy-policy')

        }else if(tab==="Packages"){
            navigate('/home/package')

        }else{
            navigate('/home/dashboard')

        }

    },[tab])


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


    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <Grid container style={{width: "100%", height: "99%"}} onClick={(e)=>{
            if(isMobile && showMenu){
                setShowMenu(false);
                e.stopPropagation();
            }
        }}>
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
                          onClick={(e)=>handleTab("Waivers")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Waivers"?1:0.9}}>
                        <CustomLabelHeader text={"Waivers"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={(e)=>handleTab("Experiences")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Experiences"?1:0.9}}>
                        <CustomLabelHeader text={"Experiences"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={(e)=>handleTab("Groups")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Groups"?1:0.9}}>
                        <CustomLabelHeader text={"Groups"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={(e)=>handleTab("Game Masters")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Game Masters"?1:0.9}}>
                        <CustomLabelHeader text={"Game Masters"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={(e)=>handleTab("Packages")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Packages"?1:0.9}}>
                        <CustomLabelHeader text={"Packages"} color={"white"} fontWeight={"bold"}/>
                        <Divider style={{width: "100%", background: "white", marginTop: "10px"}}/>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-start"}
                          onClick={(e)=>handleTab("Privacy Policy")}
                          style={{marginTop: "10px",cursor:"pointer",opacity:tab==="Privacy Policy"?1:0.9}}>
                        <CustomLabelHeader text={"Privacy Policy"} color={"white"} fontWeight={"bold"}/>
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
                                <MenuIcon style={{color: "#1e1e2d",maxWidth:"32px"}}/>
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
                    <Outlet/>
                    {/*{*/}
                        {/*tab==="Dashboard" && <Stats/>*/}
                    {/*}*/}
                    {/*{*/}
                        {/*tab==="Users" && <Users/>*/}
                    {/*}*/}
                    {/*{*/}
                        {/*tab==="Partners" && <Partners/>*/}
                    {/*}*/}
                    {/*{*/}
                        {/*tab==="Venues" && <Venues/>*/}
                    {/*}*/}
                    {/*{*/}
                        {/*tab==="Organizers/Partner" && <OrganizerPartner/>*/}
                    {/*}*/}
                    {/*{*/}
                        {/*tab==="Events" && <Events/>*/}
                    {/*}*/}
                    {/*{*/}
                        {/*tab==="Organization" && <Organization/>*/}
                    {/*}*/}
                    {/*{*/}
                        {/*tab==="Notifications" && <Notification/>*/}
                    {/*}*/}
                    {/*{*/}
                        {/*tab==="Privacy Policy" && <StaticDataEditor type={"privacy-policy"}/>*/}
                    {/*}*/}
                    {/*{*/}
                        {/*tab==="About us" && <StaticDataEditor type={"about-us"}/>*/}
                    {/*}*/}
                    {/*{*/}
                        {/*tab==="Update Password" && <UpdatePassword/>*/}
                    {/*}*/}
                    {/*<Stats/>*/}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home;
