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

const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}

const PostDetailItem = ({data}) => {



    const CategoryListContainer = (data?.category || []).map((list) =>
        <MenuItem value={list}><CustomLabel text={list}/></MenuItem>)



    const TagsListContainer = (data?.tags || []).map((list) =>
        <MenuItem value={list}><CustomLabel text={list}/></MenuItem>)


    return (
        <Grid item axs={12} container justifyContent={"center"}>
            <Grid item xs={12} md={8} container justifyContent={"center"} alignItems={"center"}>
                <Grid item xs={10} container alignItems={"center"}>

                    {(data?.image || 0).length>0 &&
                        <Grid item xs={12} container justifyContent={"center"}>
                            <Carousel images={data?.image || []}/>
                        </Grid>
                    }

                    <Grid item xs={12} style={{marginTop: "20px"}}>
                        <CustomTextField label={"Title"}
                                         value={data?.title}
                        />
                    </Grid>


                    <Grid item xs={12} style={{marginTop: "20px"}}>
                        <CustomTextMultipleField label={"Content"}
                                                 value={data?.content}
                                                 rows={2}
                        />
                    </Grid>


                    <Grid item xs={12} style={{marginTop: "20px"}}>
                        <CustomTextMultipleField label={"Description"}
                                                 value={data?.description}
                                                 rows={5}
                        />
                    </Grid>


                    <Grid item xs={12} style={{marginTop: "40px"}}>
                        <CustomLabel text={"Category"}/>
                        <CustomDropdown
                            value={(data?.category || []).length > 0 && data.category[0]}
                            container={CategoryListContainer}

                        />
                    </Grid>


                    <Grid item xs={12} style={{marginTop: "40px"}}>
                        <CustomLabel text={"Tags"}/>
                        <CustomDropdown
                            value={(data?.tags || []).length > 0 && data.tags[0]}
                            container={TagsListContainer}

                        />
                    </Grid>


                </Grid>
            </Grid>

        </Grid>
    )
}
export default PostDetailItem;
