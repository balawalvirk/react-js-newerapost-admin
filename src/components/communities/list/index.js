import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllUsers,blockUnblock} from "src/services";
import {
    blockUnblockReducer,
    blockUserSliceReducer, deleteCommunityApiSliceReducer, deletePostApiSliceReducer,
    deleteUserReducer, getAllCommunitiesApiReducer, getAllPostsSliceReducer,
    getAllUsersReset,
    validateUserSliceReset
} from "src/reducers";
import ListViewer from "src/components/common/ListViewer";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from "src/components/common/Loader";
import Grid from "@mui/material/Grid/Grid";
import {CustomButtonSquareSmall} from "src/components/common/CustomButton";
import Button from "@mui/material/Button/Button";
import {getFormattedDate, removeAccessToken, saveToken} from "src/utils";
import {
    blockUnblockReset,
    cancelSubscriptionReset, deleteCommunityApiReset,
    deletePostApiSliceReset,
    deleteUserReset, getAllPostsReset, updateCommunities, updatePosts,
    updateUser
} from "src/reducers";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import ResponsiveConfirmationDialog from "src/components/common/ResponsiveConfirmation";
import {
    blockUserApi,
    cancelSubscription, deleteCommunityApi,
    deletePostApi,
    deleteUser,
    getAllCommunitiesApi,
    getAllPostsApi
} from "src/services";
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

const ListCommunities = () => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getAllCommunitiesApiReducer);
    const {data:deleteData, loading:deleteDataLoading, error:deleteDataError} =
        useSelector((state) => state.deleteCommunityApiSliceReducer);



    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [selectedUser,setSelectedUser]=useState(null);
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getAllCommunitiesApi());
        return function cleanup() {
            dispatch(getAllPostsReset());
            dispatch(deleteCommunityApiReset());

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
        if(deleteDataError){
            setConfirmation({
                show: true,
                title: "Error",
                text: deleteDataError,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(deletePostApiSliceReset())
        }else if(deleteData){
            if(selectedUser){
                const parsedData=(JSON.parse(JSON.stringify(data))).filter((d)=>selectedUser.user._id!==d._id);
                dispatch(updateCommunities(parsedData));
            }
            dispatch(deleteCommunityApiReset())

        }
    },[deleteData,deleteDataLoading])



    const handleDeletePost=(id)=>{

        const selectedUserIndex=data.findIndex((d)=>(d._id).toString()===id.toString())
        let selected=JSON.parse(JSON.stringify(data[selectedUserIndex]));

        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Are you sure you want to delete this community?`
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    dispatch(deleteCommunityApi({id:selected._id}));
                    setSelectedUser({index:selectedUserIndex,user:selected});
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
        title: `${d.title || ""}`,
        creator: `${d.user_id?.first_name || ""} ${d.user_id?.last_name || ""}`,
        description: `${d.description}`,
        rules: `${(d.rules || "").join(",")}`,
        details: <Button autoFocus onClick={(e) => {navigate(`/home/community/${d._id}/details`)}}>Details</Button>,
        delete: <span onClick={(e) => handleDeletePost(d._id)}><CustomButtonSquareSmall color={"red"} text={"Delete"}/></span>

    }))


    console.log("communites = ",data)
    return (
        <>
            {(loading || deleteDataLoading) && <Loader/>}
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
                            columns={["No","Image","Creator", "Title", "Description", "Rules","Details", "Delete"]}
                            keys={["index","image","creator", "title", "description", "rules","details","delete"]}
                            searchField={"title"}/>
            }
        </>
    )
}
export default ListCommunities;
