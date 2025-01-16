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
import {getPostByIdApi} from "src/services";
import {getPostByIdApiReset} from "src/reducers";
import {CustomTextField, CustomTextMultipleField} from "src/components/common/text";
import {CustomLabel} from "src/components/common/CustomLabel";
import {CustomDropdown} from "src/components/common/CustomDrowDown";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Carousel from "src/components/common/Carousel/carouselMUIexamRepeat";
import {CustomLabelHeader1} from "../../../common/CustomLabel";

const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}

const PostDetailGridItem = ({data}) => {




    return (
        <Grid item container alignItems={"center"} justifyContent={"center"}>

            {(data?.image || 0).length > 0 &&
            <Grid item xs={12} style={{width:"100%"}} container justifyContent={"center"}>
                <Carousel images={data?.image || []}/>
            </Grid>
            }

            <Grid item container style={{marginTop:"-60px"}} justifyContent={"center"}>
                <CustomLabelHeader1 text={data?.title} fontWeight={"bold"}
                />
            </Grid>


            {/*<Grid item xs={12}>*/}
                {/*<CustomLabel text={data?.content}*/}
                {/*/>*/}
            {/*</Grid>*/}


            {/*<Grid item container justifyContent={"center"}>*/}
                {/*<CustomLabel text={data?.description}*/}
                {/*/>*/}
            {/*</Grid>*/}


            {/*<Grid item container justifyContent={"center"}>*/}
                {/*<CustomLabel*/}
                    {/*text={(data?.category || []).length > 0 && data.category.join(",")}/>*/}
            {/*</Grid>*/}


            {/*<Grid item container justifyContent={"center"}>*/}
                {/*<CustomLabel text={(data?.tags || []).length > 0 && data.tags.join(",")}/>*/}
            {/*</Grid>*/}


        </Grid>
    )
}
export default PostDetailGridItem;
