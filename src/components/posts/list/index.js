import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllUsers,blockUnblock} from "src/services";
import {
    blockUnblockReducer,
    blockUserSliceReducer, deletePostApiSliceReducer,
    deleteUserReducer, getAllPostsSliceReducer,
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
    cancelSubscriptionReset,
    deletePostApiSliceReset,
    deleteUserReset, getAllPostsReset, updatePosts,
    updateUser
} from "src/reducers";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import ResponsiveConfirmationDialog from "src/components/common/ResponsiveConfirmation";
import {blockUserApi, cancelSubscription, deletePostApi, deleteUser, getAllPostsApi} from "src/services";
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

const ListPosts = () => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getAllPostsSliceReducer);
    const {data:deleteData, loading:deleteDataLoading, error:deleteDataError} =
        useSelector((state) => state.deletePostApiSliceReducer);



    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [selectedUser,setSelectedUser]=useState(null);
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getAllPostsApi());
        return function cleanup() {
            dispatch(getAllUsersReset());
            dispatch(deletePostApiSliceReset());

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
                dispatch(updatePosts(parsedData));
            }
            dispatch(deletePostApiSliceReset())

        }
    },[deleteData,deleteDataLoading])



    const handleDeletePost=(id)=>{

        const selectedUserIndex=data.findIndex((d)=>(d._id).toString()===id.toString())
        let selected=JSON.parse(JSON.stringify(data[selectedUserIndex]));

        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Are you sure you want to delete this post?`
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    dispatch(deletePostApi({id:selected._id}));
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
        category: `${(d.category || "").join(",")}`,
        tags: `${(d.tags || "").join(",")}`,
        delete: <span onClick={(e) => handleDeletePost(d._id)}><CustomButtonSquareSmall color={"red"} text={"Delete"}/></span>,
        details: <Button autoFocus onClick={(e) => {navigate(`/home/post/${d._id}/details`)}}>Details</Button>,
        chat: <Button autoFocus onClick={(e) => {navigate(`/home/post/${d._id}/chat`)}}>Chat</Button>,

    }))



    console.log("selected = ",selectedUser)
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
                            columns={["No","Image","Creator", "Title", "Description", "Category","Tags","Details","Chat","Delete"]}
                            keys={["index","image","creator", "title", "description", "category","tags","details","chat","delete"]}
                            searchField={"title"}/>
            }
        </>
    )
}
export default ListPosts;
