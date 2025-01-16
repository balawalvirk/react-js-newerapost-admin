import React from 'react';
import {makeStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from "@mui/material/ListItemText/ListItemText";
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import Avatar from "@mui/material/Avatar/Avatar";
import {getFormattedDateTime} from "../../../utils";

const useStyles = makeStyles({
    table: {},
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

const Chat = ({data,handleDeleteChatMessage}) => {
    const classes = useStyles();

    const chatList=data.map((d) =>
        <>
            <ListItem key="2">
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container>
                            <ListItemIcon>
                                <Avatar alt={`${d.sender_id?.first_name} ${d.sender_id?.last_name}`}
                                        src={d.sender_id?.image}/>
                            </ListItemIcon>
                            <ListItemText align="left"
                                          primary={`${d.sender_id?.first_name} ${d.sender_id?.last_name}`}></ListItemText>
                            <Grid container style={{marginTop:5}}>
                                <ListItemText align="left" secondary={d.message}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>

                                <ListItemText align="left" secondary={getFormattedDateTime(d.date_created)}></ListItemText>
                            </Grid>

                            <Grid container justifyContent={"right"} alginItems={"center"} style={{position:"absolute",right:20}}>
                                <DeleteIcon onClick={()=>handleDeleteChatMessage(d._id)} style={{cursor:"pointer"}}/>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </ListItem>
            <Divider/>
        </>)


    return (
        <div style={{width: "80%", marginTop: 20}}>
            <Grid container component={Paper} className={classes.chatSection}>

                <Grid item xs={12}>
                    <List className={classes.messageArea}>
                        {chatList}

                    </List>
                    <Divider/>

                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;
