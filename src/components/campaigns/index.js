import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllUsers,blockUnblock} from "src/services";
import {
    blockUnblockReducer,
    blockUserSliceReducer, deleteCampaignApiSliceReducer, deleteCommunityApiSliceReducer, deletePostApiSliceReducer,
    deleteUserReducer, getAllCampaignsReducer, getAllCommunitiesApiReducer, getAllPostsSliceReducer,
    getAllUsersReset,
    validateUserSliceReset
} from "src/reducers";
import ListViewer from "src/components/common/ListViewer";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from "../common/Loader";
import Grid from "@mui/material/Grid/Grid";
import {CustomButtonSquareSmall} from "src/components/common/CustomButton";
import Button from "@mui/material/Button/Button";
import {getFormattedDate, removeAccessToken, saveToken} from "../../utils";
import {
    blockUnblockReset,
    cancelSubscriptionReset,
    deleteCampaignApiReset,
    deleteCommunityApiReset,
    deletePostApiSliceReset,
    deleteUserReset,
    getAllCampaignsReset,
    getAllPostsReset,
    updateCampaignApiReset,
    updateCampaigns,
    updateCommunities,
    updatePosts,
    updateUser
} from "../../reducers";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";
import {
    blockUserApi,
    cancelSubscription, deleteCampaignApi, deleteCommunityApi,
    deletePostApi,
    deleteUser, getAllCampaignsApi,
    getAllCommunitiesApi,
    getAllPostsApi, updateCampaignApi
} from "../../services";
import moment from "moment";

const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}

const Campaigns = () => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getAllCampaignsReducer);
    const {data:updateData, loading:updateDataLoading, error:updateDataError} =
        useSelector((state) => state.updateCampaignApiSliceReducer);



    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [selectedUser,setSelectedUser]=useState(null);
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getAllCampaignsApi());
        return function cleanup() {
            dispatch(getAllCampaignsReset());
            dispatch(updateCampaignApiReset());

        };
    }, []);

    useEffect(()=>{
        if(error){
            if(error==="Please authenticate"){
                removeAccessToken();
                navigate(`/login`)
            }
        }
    },[data,loading]);







    useEffect(()=>{
        if(updateDataError){
            setConfirmation({
                show: true,
                title: "Error",
                text: updateDataError,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(updateCampaignApiReset())
        }else if(updateData){
            if(selectedUser){
                const parsedData=JSON.parse(JSON.stringify(data));
                parsedData[selectedUser.index]=selectedUser.user;
                dispatch(updateCampaigns(parsedData));
            }
            dispatch(updateCampaignApiReset())

        }
    },[updateData,updateDataLoading])



    const handleApprove=(id)=>{

        const selectedUserIndex=data.findIndex((d)=>(d._id).toString()===id.toString())
        let selectedUser=JSON.parse(JSON.stringify(data[selectedUserIndex]));
        selectedUser.is_approved=!selectedUser.is_approved

        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Are you sure you want to ${!selectedUser.is_approved?"approve":"refuse"} this campaign?`
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    dispatch(updateCampaignApi({is_approved:selectedUser.is_approved,id:selectedUser._id}));
                    setSelectedUser({index:selectedUserIndex,user:selectedUser});
                    setConfirmation(initialConfirmation)
                }}>ok</Button>,
            buttonNo:<Button autoFocus onClick={(e) => {
                setConfirmation(initialConfirmation)
            }}>cancel</Button>
        });
    }




    let filteredData = [];
    filteredData = data && data.length > 0 && data.map((d, index) => ({
        index: index + 1,
        image: (d.image).length>0?d.image[0]?.src:"",
        creator: `${d.user_id?.first_name || ""} ${d.user_id?.last_name || ""}`,
        name: `${d.name || ""}`,
        title: `${d.name || ""}`,
        category: `${d.audience?.category || ""}`,
        age: `${d.audience?.age || ""}`,
        gender: `${d.audience?.gender || ""}`,
        total_budget: `${d.budget?.total || ""}`,
        daily_budget: `${d.budget?.daily || ""}`,
        is_approved: d.is_approved ?
            <span onClick={(e) => handleApprove(d._id)}><CustomButtonSquareSmall color={"red"} text={"Refuse"}/></span> :
            <span onClick={(e) => handleApprove(d._id)}><CustomButtonSquareSmall text={"Approve"}/></span>

    }))


    return (
        <>
            {(loading || updateDataLoading) && <Loader/>}
            {
                confirmation.show &&
                <ResponsiveConfirmationDialog
                    title={confirmation.title} text={confirmation.text}
                    buttons={confirmation.buttonYes}
                    otherButton={confirmation.buttonNo}
                />
            }
            {
                filteredData &&
                <ListViewer data={filteredData}
                            columns={["No","Image","Creator","Name", "Title","Category","Age","Gender","Total Budget","Daily Budget", "Approve"]}
                            keys={["index","image","creator", "title", "name", "category","age","gender","total_budget","daily_budget","is_approved"]}
                            searchField={"title"}/>
            }
        </>
    )
}
export default Campaigns;
