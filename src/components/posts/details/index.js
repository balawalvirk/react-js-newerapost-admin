import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllUsers, blockUnblock} from "src/services";
import {
    blockUnblockReducer,
    blockUserSliceReducer, deletePostApiSliceReducer,
    deleteUserReducer, getAllPostsSliceReducer,
    getAllUsersReset, getPostByIdApiSliceReducer,
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
import {useOutletContext, useParams} from "react-router-dom";
import {getPostByIdApi} from "../../../services";
import {getPostByIdApiReset} from "../../../reducers";
import {CustomTextField, CustomTextMultipleField} from "../../common/text";
import {CustomLabel} from "../../common/CustomLabel";
import {CustomDropdown} from "../../common/CustomDrowDown";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Carousel from "../../common/Carousel/carouselMUIexamRepeat";
import PostDetailItem from "./item";

const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}

const PostDetails = () => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getPostByIdApiSliceReducer);

    let {id} = useParams();

    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [selectedUser, setSelectedUser] = useState(null);
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getPostByIdApi({id}));
        return function cleanup() {
            dispatch(getPostByIdApiReset());

        };
    }, []);

    useEffect(() => {
        if (error) {
            if (error === "Please authenticate") {
                removeAccessToken();
                navigate(`/login`)
            }
        }
    }, [data, loading]);


    console.log("selected = ", data)


    const CategoryListContainer = (data?.category || []).map((list) =>
        <MenuItem value={list}><CustomLabel text={list}/></MenuItem>)



    const TagsListContainer = (data?.tags || []).map((list) =>
        <MenuItem value={list}><CustomLabel text={list}/></MenuItem>)


    return (
        <Grid item axs={12} container justifyContent={"center"} style={{marginTop: "50px"}}>
            {(loading) && <Loader/>}
            <PostDetailItem data={data}/>

        </Grid>
    )
}
export default PostDetails;
