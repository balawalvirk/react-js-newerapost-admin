import {createSlice} from "@reduxjs/toolkit";
import {
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
    updatePasswordAdminApi, getAllWaivers,
    getAllExperiences,getAllGroupsApi,
    getAllGameMastersApi,
    postSubscriptionPackageApi,
    getSubscriptionPackageApi,
    updateSubscriptionPackageApi,
    deletePackageApi
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


export const deleteUserSlice = createSlice({
    name: 'deleteUserSlice',
    initialState,
    reducers: {
        deleteUserReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const getAllPartnersSlice = createSlice({
    name: 'getAllPartnersSlice',
    initialState,
    reducers: {
        getAllPartnersReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        },
        updatePartner: (state, {payload}) => {
            state.data = payload;
        }
    },
    extraReducers: {
        [getAllPartners.pending]: (state) => {
            state.loading = true
        },
        [getAllPartners.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getAllPartners.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const deletePartnerByIdSlice = createSlice({
    name: 'deletePartnerByIdSlice',
    initialState,
    reducers: {
        deletePartnerByIdReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [deletePartnerById.pending]: (state) => {
            state.loading = true
        },
        [deletePartnerById.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [deletePartnerById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const getPartnerDetailsSlice = createSlice({
    name: 'getPartnerDetailsSlice',
    initialState,
    reducers: {
        getPartnerDetailsReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getPartnerDetails.pending]: (state) => {
            state.loading = true
        },
        [getPartnerDetails.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getPartnerDetails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const getAllVenuesSlice = createSlice({
    name: 'getAllVenuesSlice',
    initialState,
    reducers: {
        getAllVenuesReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        },
        updateVenue: (state, {payload}) => {
            state.data = payload;
        }
    },
    extraReducers: {
        [getAllVenues.pending]: (state) => {
            state.loading = true
        },
        [getAllVenues.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getAllVenues.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const deleteVenueByIdSlice = createSlice({
    name: 'deleteVenueByIdSlice',
    initialState,
    reducers: {
        deleteVenueByIdReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [deleteVenueById.pending]: (state) => {
            state.loading = true
        },
        [deleteVenueById.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [deleteVenueById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const getAllEventOfReservationsSlice = createSlice({
    name: 'getAllEventOfReservationsSlice',
    initialState,
    reducers: {
        getAllEventOfReservationsReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getAllEventOfReservations.pending]: (state) => {
            state.loading = true
        },
        [getAllEventOfReservations.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getAllEventOfReservations.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const updatePasswordAdminSlice = createSlice({
    name: 'updatePasswordAdminSlice',
    initialState,
    reducers: {
        updatePasswordAdminReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [updatePasswordAdminApi.pending]: (state) => {
            state.loading = true
        },
        [updatePasswordAdminApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [updatePasswordAdminApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});




export const getAllWaiverSlice = createSlice({
    name: 'getAllWaiverSlice',
    initialState,
    reducers: {
        getAllWaiverReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getAllWaivers.pending]: (state) => {
            state.loading = true
        },
        [getAllWaivers.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getAllWaivers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const getAllExperiencesSlice = createSlice({
    name: 'getAllExperiencesSlice',
    initialState,
    reducers: {
        getAllExperiencesReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getAllExperiences.pending]: (state) => {
            state.loading = true
        },
        [getAllExperiences.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getAllExperiences.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});





export const getAllGroupsSlice = createSlice({
    name: 'getAllGroupsSlice',
    initialState,
    reducers: {
        getAllGroupsReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getAllGroupsApi.pending]: (state) => {
            state.loading = true
        },
        [getAllGroupsApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getAllGroupsApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const getAllGameMastersSlice = createSlice({
    name: 'getAllGroupsSlice',
    initialState,
    reducers: {
        getAllGameMastersReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getAllGameMastersApi.pending]: (state) => {
            state.loading = true
        },
        [getAllGameMastersApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getAllGameMastersApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});




export const postSubscriptionPackageSlice = createSlice({
    name: 'postSubscriptionPackageSlice',
    initialState,
    reducers: {
        postSubscriptionPackageReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [postSubscriptionPackageApi.pending]: (state) => {
            state.loading = true
        },
        [postSubscriptionPackageApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [postSubscriptionPackageApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const getSubscriptionPackageSlice = createSlice({
    name: 'getSubscriptionPackageSlice',
    initialState,
    reducers: {
        getSubscriptionPackageReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [getSubscriptionPackageApi.pending]: (state) => {
            state.loading = true
        },
        [getSubscriptionPackageApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [getSubscriptionPackageApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});


export const updateSubscriptionPackageApiSlice = createSlice({
    name: 'updateSubscriptionPackageApiSlice',
    initialState,
    reducers: {
        updateSubscriptionPackageApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [updateSubscriptionPackageApi.pending]: (state) => {
            state.loading = true
        },
        [updateSubscriptionPackageApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [updateSubscriptionPackageApi.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
});



export const deletePackageApiSlice = createSlice({
    name: 'deletePackageApiSlice',
    initialState,
    reducers: {
        deletePackageApiReset: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
        }
    },
    extraReducers: {
        [deletePackageApi.pending]: (state) => {
            state.loading = true
        },
        [deletePackageApi.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.data = payload

        },
        [deletePackageApi.rejected]: (state, action) => {
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
export const {deleteUserReset} = deleteUserSlice.actions;
export const {getAllPartnersReset,updatePartner} = getAllPartnersSlice.actions;
export const {deletePartnerByIdReset} = deletePartnerByIdSlice.actions;
export const {getPartnerDetailsReset} = getPartnerDetailsSlice.actions;
export const {getAllVenuesReset,updateVenue} = getAllVenuesSlice.actions;
export const {deleteVenueByIdReset} = deleteVenueByIdSlice.actions;
export const {getAllEventOfReservationsReset} = getAllEventOfReservationsSlice.actions;
export const {updatePasswordAdminReset} = updatePasswordAdminSlice.actions;
export const {getAllWaiverReset} = getAllWaiverSlice.actions;
export const {getAllExperiencesReset} = getAllExperiencesSlice.actions;
export const {getAllGroupsReset} = getAllGroupsSlice.actions;
export const {getAllGameMastersReset} = getAllGameMastersSlice.actions;
export const {postSubscriptionPackageReset} = postSubscriptionPackageSlice.actions;
export const {getSubscriptionPackageReset} = getSubscriptionPackageSlice.actions;
export const {updateSubscriptionPackageApiReset} = updateSubscriptionPackageApiSlice.actions;
export const {deletePackageApiReset} = deletePackageApiSlice.actions;

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
export const deleteUserReducer = deleteUserSlice.reducer;
export const getAllPartnersReducer = getAllPartnersSlice.reducer;
export const deletePartnerByIdReducer = deletePartnerByIdSlice.reducer;
export const getPartnerDetailsReducer = getPartnerDetailsSlice.reducer;
export const getAllVenuesReducer = getAllVenuesSlice.reducer;
export const deleteVenueByIdReducer = deleteVenueByIdSlice.reducer;
export const getAllEventOfReservationsReducer = getAllEventOfReservationsSlice.reducer;
export const updatePasswordAdminReducer = updatePasswordAdminSlice.reducer;
export const getAllWaiverReducer = getAllWaiverSlice.reducer;
export const getAllExperiencesReducer = getAllExperiencesSlice.reducer;
export const getAllGroupsReducer = getAllGroupsSlice.reducer;
export const getAllGameMastersReducer = getAllGameMastersSlice.reducer;
export const postSubscriptionPackageReducer = postSubscriptionPackageSlice.reducer;
export const getSubscriptionPackageReducer = getSubscriptionPackageSlice.reducer;
export const updateSubscriptionPackageApiSliceReducer = updateSubscriptionPackageApiSlice.reducer;
export const deletePackageApiSliceReducer = deletePackageApiSlice.reducer;
