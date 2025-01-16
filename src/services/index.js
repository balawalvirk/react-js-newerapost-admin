import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {baseUl} from "src/constants/service";
import {getAccessToken} from "../utils";


axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("response = ", response)
    return response;
}, function (error) {
    if (error.message === "Network Error") {
        error.response.status = 101;
    }
    if (error.response.status === 401) {
        error.response.data.message = "Please authenticate";
    }
    return Promise.reject(error);
});

const validateAdmin = createAsyncThunk("validateAdminApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}admin/validate`, data);
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getUserStats = createAsyncThunk("getUserStats", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/user-stats`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllUsers = createAsyncThunk("getAllUsers", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}admin/users-all`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllWaivers = createAsyncThunk("getAllWaivers", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}waiver`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)

const getAllOrganizerPartners = createAsyncThunk("getAllOrganizerPartners", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/organization-partner/all`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllEvents = createAsyncThunk("getAllEvents", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/events/all`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const postOrganization = createAsyncThunk("postOrganization", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}users/organization`, data, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllOrganization = createAsyncThunk("getAllOrganization", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/organization/all`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const blockUnblock = createAsyncThunk("blockUnblock", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${baseUl}user/blocked-status`, data, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const cancelSubscription = createAsyncThunk("cancelSubscription", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}payment/cancel-subscription`, data, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const blockUnblockPartner = createAsyncThunk("blockUnblockPartner", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}users/block/partner`, data, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const deleteEvent = createAsyncThunk("deleteEvent", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}users/event/${data}`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const sendFirebasePushNotifications = createAsyncThunk("sendFirebasePushNotifications", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}users/notification`, data, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const postStaticData = createAsyncThunk("postStaticData", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}static`, data, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getStaticDataByType = createAsyncThunk("getStaticDataByType", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}static/type/${data}`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllEventDetails = createAsyncThunk("getAllEventDetails", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/event/details/${data}`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const postEventDetails = createAsyncThunk("postEventDetails", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${baseUl}event/${data.id}/admin`, data, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const deleteUser = createAsyncThunk("deleteUser", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}users/${data}`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return {success: true};
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllPartners = createAsyncThunk("getAllPartners", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/partners/all`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const deletePartnerById = createAsyncThunk("deletePartnerById", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}partners/${data}`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return {success: true};
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)

const getPartnerDetails = createAsyncThunk("getPartnerDetails", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}reservation/partner/${data}/admin`,
                {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllVenues = createAsyncThunk("getAllVenues", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/venues/all`,
                {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const deleteVenueById = createAsyncThunk("deleteVenueById", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}venue/${data}`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return {success: true};
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllEventOfReservations = createAsyncThunk("getAllEventReservations", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}reservation/event/${data}/admin`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllExperiences = createAsyncThunk("getAllExperiences", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}experience`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllGroupsApi = createAsyncThunk("getAllGroups", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}group`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllGameMastersApi = createAsyncThunk("getAllGameMastersApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}game-master`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const postSubscriptionPackageApi = createAsyncThunk("postSubscriptionPackageApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}package`, data, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getSubscriptionPackageApi = createAsyncThunk("getSubscriptionPackageApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}package`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const updateSubscriptionPackageApi = createAsyncThunk("updateSubscriptionPackageApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${baseUl}package/${data.packageId}`, data, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const deletePackageApi = createAsyncThunk("deletePackageApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}package/${data.packageId}`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const addRewardApi = createAsyncThunk("addReward", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}payment/update-subscription-android`
                , data, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const blockUserApi = createAsyncThunk("blockUser", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}admin/${data.id}/block-user`
                , data, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllPostsApi = createAsyncThunk("getAllPostsApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}admin/posts-all`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllCampaignsApi = createAsyncThunk("getAllCampaignsApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}admin/campaigns-all`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllCommunitiesApi = createAsyncThunk("getAllCommunitiesApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}admin/communities-all`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const deletePostApi = createAsyncThunk("deletePostApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}admin/post/${data.id}`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const deleteCampaignApi = createAsyncThunk("deleteCampaignApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}admin/campaign/${data.id}`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const deleteCommunityApi = createAsyncThunk("deleteCommunityApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}admin/community/${data.id}`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const updateCampaignApi = createAsyncThunk("updateCampaignApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}admin/${data.id}/campaign`
                , data, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getPostByIdApi = createAsyncThunk("getPostByIdApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}post/${data.id}/admin`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getPostChatApi = createAsyncThunk("getPostChatApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}post/${data.id}/messages-admin`,
                {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const deleteChatMessageApi = createAsyncThunk("deleteChatMessageApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}post/chat/${data.id}`, {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getCommunityByIdApi = createAsyncThunk("getCommunityByIdApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}community/${data.id}/admin`,
                {headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)




const updatePasswordAdminApi = createAsyncThunk("updatePasswordAdminApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${baseUl}admin/password`,data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


export {
    validateAdmin,
    getUserStats,
    getAllUsers,
    getAllOrganizerPartners,
    getAllEvents,
    postOrganization,
    getAllOrganization,
    blockUnblock,
    cancelSubscription,
    blockUnblockPartner,
    deleteEvent,
    sendFirebasePushNotifications,
    postStaticData,
    getStaticDataByType,
    getAllEventDetails,
    postEventDetails,
    deleteUser,
    getAllPartners,
    deletePartnerById,
    getPartnerDetails,
    getAllVenues,
    deleteVenueById,
    getAllEventOfReservations,
    updatePasswordAdminApi,
    getAllWaivers,
    getAllExperiences,
    getAllGroupsApi,
    getAllGameMastersApi,
    postSubscriptionPackageApi,
    getSubscriptionPackageApi,
    updateSubscriptionPackageApi,
    deletePackageApi,
    addRewardApi,
    blockUserApi,
    getAllPostsApi,
    getAllCampaignsApi,
    getAllCommunitiesApi,
    deletePostApi,
    deleteCommunityApi,
    deleteCampaignApi,
    updateCampaignApi,
    getPostByIdApi,
    getPostChatApi,
    deleteChatMessageApi,
    getCommunityByIdApi

}
