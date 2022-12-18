import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {baseUl} from "src/constants/service";
import {getAccessToken} from "../utils";

const validateAdmin = createAsyncThunk("validateAdminApi", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}auth/login/admin`, data);
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getUserStats = createAsyncThunk("getUserStats", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/user-stats`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getAllUsers = createAsyncThunk("getAllUsers", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}users/all`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getAllOrganizerPartners = createAsyncThunk("getAllOrganizerPartners", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}/users/organization-partner/all`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)



const getAllEvents = createAsyncThunk("getAllEvents", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}/users/events/all`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const postOrganization = createAsyncThunk("postOrganization", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}users/organization`, data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const getAllOrganization = createAsyncThunk("getAllOrganization", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${baseUl}/users/organization/all`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const blockUnblock = createAsyncThunk("blockUnblock", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}users/block`, data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const cancelSubscription = createAsyncThunk("cancelSubscription", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}stripe/cancel-admin-subscription`, data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const blockUnblockPartner = createAsyncThunk("blockUnblockPartner", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}users/block/partner`, data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const deleteEvent = createAsyncThunk("deleteEvent", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${baseUl}/users/event/${data}`,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
            return response.data;
        } catch (e) {
            const errorResponse = e.response && e.response.data && e.response.data.message ? e.response.data.message : "Server error";
            return rejectWithValue(errorResponse);
        }
    }
)


const sendFirebasePushNotifications = createAsyncThunk("sendFirebasePushNotifications", async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${baseUl}/users/notification`,data,{headers: {"Authorization": `Bearer ${getAccessToken()}`}});
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
    sendFirebasePushNotifications
}