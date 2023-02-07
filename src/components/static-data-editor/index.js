import Loader from "../common/Loader";
import Grid from "@mui/material/Grid/Grid";
import {CustomTextField} from "../common/text";
import {CustomButtonSquareSmall} from "../common/CustomButton";
import React, {useEffect, useState} from "react";
import {CustomDropdown} from "../common/CustomDrowDown";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {transformValidateObject, validateUserInput} from "../../utils";
import {getStaticDataByType, postStaticData, sendFirebasePushNotifications, validateAdmin} from "../../services";
import {useDispatch, useSelector} from "react-redux";
import {
    blockUnblockReset, getStaticDataByTypeReset, postStaticDataReset,
    sendFirebasePushNotificationsReducer,
    sendFirebasePushNotificationsReset,
    updateUser, validateUserSliceReset
} from "../../reducers";
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import Button from "@mui/material/Button/Button";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState,ContentState,convertToRaw,convertFromHTML  } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import sanitizeHtml from 'sanitize-html';

const initialLogin = {
    title: {value: null, error: "Title cant be empty", showError: false},
    body: {value: null, error: "Body cant be empty", showError: false},
    type: {value: null, error: "Type cant be empty", showError: false}

};

const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}

const StaticDataEditor = (props) => {

    const {type}=props;


    const dispatch = useDispatch()
    const [content, setContent] = useState(EditorState.createEmpty());
    const [count, setCount] = useState(0);
    const {data:staticData, loading:staticDataLoading, error:staticDataError} = useSelector((state) => state.getStaticDataByReducer);
    const {data, loading, error} = useSelector((state) => state.postStaticDataReducer);
    const [confirmation, setConfirmation] = useState(initialConfirmation);


    useEffect(()=>{

        dispatch(getStaticDataByType(type));
        return function cleanup() {
            dispatch(getStaticDataByTypeReset());
            dispatch(postStaticDataReset());

        };
    },[])

    useEffect(()=>{
        setContent(EditorState.createEmpty())
    },[type])



    const saveStaticDataFromServer=(data)=>{
        const sampleMarkup =data;

        const blocksFromHTML = convertFromHTML(sampleMarkup);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap,
        );
        setContent(EditorState.createWithContent(state))
    }

    useEffect(()=>{
        if(error){
            setConfirmation({
                show: true,
                title: "Error",
                text: staticDataError,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
        }else if(staticData){
            saveStaticDataFromServer(staticData.data);
        }else{
            saveStaticDataFromServer('');

        }
    },[staticData,staticDataLoading,staticDataError])


    useEffect(()=>{
        if(error){
            setConfirmation({
                show: true,
                title: "Error",
                text: error,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(postStaticDataReset())
        }else if(data){
            setConfirmation({
                show: true,
                title: "Success",
                text: "Update successfully",
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(postStaticDataReset())

        }
    },[data,loading,error])


    const onChange = (content) => {
        setContent(content);
        setCount(count + 1);
    }

    const handleEditorSave=(e)=>{
        const data=sanitizeHtml(draftToHtml(convertToRaw(content.getCurrentContent())));
        const parsedData=btoa(data.replace(/[\u00A0-\u2666]/g, function(c) {
            return '&#' + c.charCodeAt(0) + ';';
        }));
        dispatch(postStaticData({data:parsedData,type}));
    }



    const TypeContainer = ["User", "Organizers/partners"].map((item) => <MenuItem value={item}>{item}</MenuItem>)


    return (
        <>
            {(loading || staticDataLoading) && <Loader/>}
            {
                confirmation.show &&
                <ResponsiveConfirmationDialog
                    title={confirmation.title} text={confirmation.text}
                    buttons={confirmation.buttonYes}
                    otherButton={confirmation.buttonNo}
                />
            }
            <Grid container xs={11} md={8} lg={6} style={{marginTop: "20px"}}>
                <Grid item xs={12}>
                    <Editor
                        editorState={content}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={setContent}
                    />
                </Grid>

                <Grid item xs={12} container justifyContent={"flex-end"} style={{marginTop: "20px"}} spacing={2}>
                    <Grid item onClick={handleEditorSave}>
                        <CustomButtonSquareSmall text={"Save Changes"}/>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default StaticDataEditor;