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
import {getCommunityByIdApi, getPostByIdApi} from "../../../services";
import {getCommunityByIdApiReset, getPostByIdApiReset} from "../../../reducers";
import {CustomTextField, CustomTextMultipleField} from "../../common/text";
import {CustomLabel, CustomLabelHeaderLogin} from "../../common/CustomLabel";
import {CustomDropdown} from "../../common/CustomDrowDown";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Carousel from "../../common/Carousel/carouselMUIexamRepeat";
import {isArray} from "../../../utils";
import PostDetailItem from "../../posts/details/item";
import PostDetailGridItem from "../../posts/details/grid-item";

const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}

const CommunityDetails = () => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getCommunityByIdApiSliceReducer);

    let {id} = useParams();

    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const [selectedUser, setSelectedUser] = useState(null);
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(getCommunityByIdApi({id: "6628acc646d898ff6f58eb4c"}));
        return function cleanup() {
            dispatch(getCommunityByIdApiReset());

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


    const RulesListContainer = (data?.rules || []).map((list) =>
        <MenuItem value={list}><CustomLabel text={list}/></MenuItem>)


    const filteredMembersList = (data?.members || []).filter((m) => m.user_id);

    const MembersContainer = filteredMembersList.map((list) =>
        <MenuItem value={list}><CustomLabel
            text={list.user_id && `${list.user_id.first_name || ""} ${list.user_id.last_name || ""}`}/></MenuItem>)


    const PostListContainer = (data?.posts || []).filter((p)=>p.image.length>0).map((post) =>
        <>
        <Grid item xs={5.5} container justifyContent={"center"}>
            <PostDetailGridItem data={post}/>
        </Grid>
            </>
    )

    console.log("postlist container = ", PostListContainer)

    return (
        <Grid item axs={12} container justifyContent={"center"} style={{marginTop: "50px"}}>
            {(loading) && <Loader/>}
            <Grid item xs={12} md={8} container justifyContent={"center"}
                  sx={{height: {xs: "auto", md: "100%", marginBottom: "20px"}}} alignItems={"center"}>
                <Grid item xs={10} container alignItems={"center"}>

                    {(data?.image || 0).length > 0 && isArray(data.image) &&
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
                        <CustomLabel text={"Rules"}/>
                        <CustomDropdown
                            value={(data?.rules || []).length > 0 && data.rules[0]}
                            container={RulesListContainer}

                        />
                    </Grid>


                    <Grid item xs={12} style={{marginTop: "40px"}}>
                        <CustomLabel text={"Members"}/>
                        <CustomDropdown
                            container={MembersContainer}
                        />
                    </Grid>


                </Grid>


                <Grid container justifyContent={"center"}>
                    <CustomLabelHeaderLogin text={"Post List"} color={"#1e1e2d"} fontWeight={"bold"}/>
                    <Grid container justifyContent={"space-between"}>
                    {PostListContainer}
                    </Grid>
                </Grid>
            </Grid>


        </Grid>
    )
}
export default CommunityDetails;
