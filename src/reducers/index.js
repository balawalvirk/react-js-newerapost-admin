import {createSlice} from "@reduxjs/toolkit";
import {
    validateAdmin,getUserStats,getAllUsers,getAllOrganizerPartners,getAllEvents,postOrganization,getAllOrganization,blockUnblock,cancelSubscription,
    blockUnblockPartner,deleteEvent,sendFirebasePushNotifications,postStaticData,getStaticDataByType,getAllEventDetails,postEventDetails
} from 'src/services/index';
import {selectedLanguage} from "src/constants/service";

const initialState = {
    data: null,
    loading: false,
    error:null
}


const initialStateSelectedLanguage = {
    selectedLanguage:selectedLanguage,
    engList:[],
    urduList:[],
}





export const languageSlice = createSlice({
    name: 'language',
    initialState:initialStateSelectedLanguage,
    reducers: {
        updateSelectedLanguage: (state,{payload}) => {
            state.selectedLanguage = payload.selectedLanguage;
            state.engList = payload.engList;
            state.urduList = payload.urduList;

        }
    }
});


export const validateUserSlice = createSlice({
    name: 'validateUser',
    initialState,
    reducers: {
        validateUserSliceReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [validateAdmin.pending]: (state) => {
            state.loading = true
        },
        [validateAdmin.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [validateAdmin.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const getUserStatsSlice = createSlice({
    name: 'validateUser',
    initialState,
    reducers: {
        getUserStatsReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getUserStats.pending]: (state) => {
            state.loading = true
        },
        [getUserStats.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getUserStats.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const getAllUsersSlice = createSlice({
    name: 'getAllUsers',
    initialState,
    reducers: {
        getAllUsersReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        },
        updateUser: (state, {payload}) => {
            state.data = payload;
        }
    },
    extraReducers: {
        [getAllUsers.pending]: (state) => {
            state.loading = true
        },
        [getAllUsers.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getAllUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const getAllOrganizerPartnersSlice = createSlice({
    name: 'getAllOrganizerPartners',
    initialState,
    reducers: {
        getAllOrganizerPartnersReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        },
        updateOrganizerPartner: (state, {payload}) => {
            state.data = payload;
        }
    },
    extraReducers: {
        [getAllOrganizerPartners.pending]: (state) => {
            state.loading = true
        },
        [getAllOrganizerPartners.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getAllOrganizerPartners.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});

export const getAllEventsSlice = createSlice({
    name: 'getAllEvents',
    initialState,
    reducers: {
        getAllEventsReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        },
        updateEvent: (state, {payload}) => {
            state.data = payload;
        }
    },
    extraReducers: {
        [getAllEvents.pending]: (state) => {
            state.loading = true
        },
        [getAllEvents.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getAllEvents.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const postOrganizationSlice = createSlice({
    name: 'postOrganization',
    initialState,
    reducers: {
        postOrganizationReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [postOrganization.pending]: (state) => {
            state.loading = true
        },
        [postOrganization.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [postOrganization.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const getAllOrganizationSlice = createSlice({
    name: 'getAllOrganization',
    initialState,
    reducers: {
        getAllOrganizationReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getAllOrganization.pending]: (state) => {
            state.loading = true
        },
        [getAllOrganization.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getAllOrganization.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const blockUnblockSlice = createSlice({
    name: 'blockUnblock',
    initialState,
    reducers: {
        blockUnblockReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [blockUnblock.pending]: (state) => {
            state.loading = true
        },
        [blockUnblock.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [blockUnblock.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const cancelSubscriptionSlice = createSlice({
    name: 'blockUnblock',
    initialState,
    reducers: {
        cancelSubscriptionReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [cancelSubscription.pending]: (state) => {
            state.loading = true
        },
        [cancelSubscription.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [cancelSubscription.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const blockUnblockPartnerSlice = createSlice({
    name: 'blockUnblockPartner',
    initialState,
    reducers: {
        blockUnblockPartnerReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [blockUnblockPartner.pending]: (state) => {
            state.loading = true
        },
        [blockUnblockPartner.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [blockUnblockPartner.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const deleteEventSlice = createSlice({
    name: 'blockUnblockPartner',
    initialState,
    reducers: {
        deleteEventReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [deleteEvent.pending]: (state) => {
            state.loading = true
        },
        [deleteEvent.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [deleteEvent.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});

export const sendFirebasePushNotificationsSlice = createSlice({
    name: 'sendFirebasePushNotifications',
    initialState,
    reducers: {
        sendFirebasePushNotificationsReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [sendFirebasePushNotifications.pending]: (state) => {
            state.loading = true
        },
        [sendFirebasePushNotifications.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [sendFirebasePushNotifications.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const postStaticDataSlice = createSlice({
    name: 'postStaticDataSlice',
    initialState,
    reducers: {
        postStaticDataReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [postStaticData.pending]: (state) => {
            state.loading = true
        },
        [postStaticData.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [postStaticData.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const getStaticDataBySlice = createSlice({
    name: 'getStaticDataBySlice',
    initialState,
    reducers: {
        getStaticDataByTypeReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getStaticDataByType.pending]: (state) => {
            state.loading = true
        },
        [getStaticDataByType.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getStaticDataByType.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const getAllEventDetailsSlice = createSlice({
    name: 'getAllEventDetailsSlice',
    initialState,
    reducers: {
        getAllEventDetailsReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getAllEventDetails.pending]: (state) => {
            state.loading = true
        },
        [getAllEventDetails.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getAllEventDetails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const postEventDetailsSlice = createSlice({
    name: 'postEventDetails',
    initialState,
    reducers: {
        postEventDetailsReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [postEventDetails.pending]: (state) => {
            state.loading = true
        },
        [postEventDetails.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [postEventDetails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const {validateUserSliceReset} = validateUserSlice.actions;
export const {getUserStatsReset} = getUserStatsSlice.actions;
export const {getAllUsersReset,updateUser} = getAllUsersSlice.actions;
export const {getAllOrganizerPartnersReset,updateOrganizerPartner} = getAllOrganizerPartnersSlice.actions;
export const {getAllEventsReset,updateEvent} = getAllEventsSlice.actions;
export const {postOrganizationReset} = postOrganizationSlice.actions;
export const {getAllOrganizationReset} = getAllOrganizationSlice.actions;
export const {blockUnblockReset} = blockUnblockSlice.actions;
export const {cancelSubscriptionReset} = cancelSubscriptionSlice.actions;
export const {blockUnblockPartnerReset} = blockUnblockPartnerSlice.actions;
export const {deleteEventReset} = deleteEventSlice.actions;
export const {sendFirebasePushNotificationsReset} = sendFirebasePushNotificationsSlice.actions;
export const {postStaticDataReset} = postStaticDataSlice.actions;
export const {getStaticDataByTypeReset} = getStaticDataBySlice.actions;
export const {getAllEventDetailsReset} = getAllEventDetailsSlice.actions;
export const {postEventDetailsReset} = postEventDetailsSlice.actions;


export const validateUserReducer = validateUserSlice.reducer;
export const getUserStatsSliceReducer = getUserStatsSlice.reducer;
export const getAllUsersReducer = getAllUsersSlice.reducer;
export const getAllOrganizerPartnersReducer = getAllOrganizerPartnersSlice.reducer;
export const getAllEventsReducer = getAllEventsSlice.reducer;
export const postOrganizationReducer = postOrganizationSlice.reducer;
export const getAllOrganizationReducer = getAllOrganizationSlice.reducer;
export const blockUnblockReducer = blockUnblockSlice.reducer;
export const cancelSubscriptionReducer = cancelSubscriptionSlice.reducer;
export const blockUnblockPartnerReducer = blockUnblockPartnerSlice.reducer;
export const deleteEventReducer = deleteEventSlice.reducer;
export const sendFirebasePushNotificationsReducer = sendFirebasePushNotificationsSlice.reducer;
export const postStaticDataReducer = postStaticDataSlice.reducer;
export const getStaticDataByReducer = getStaticDataBySlice.reducer;
export const getAllEventDetailsReducer = getAllEventDetailsSlice.reducer;
export const postEventDetailsReducer = postEventDetailsSlice.reducer;
