import {configureStore} from '@reduxjs/toolkit'

import {
    validateUserReducer,getUserStatsSliceReducer,getAllUsersReducer,getAllOrganizerPartnersReducer,getAllEventsReducer,postOrganizationReducer,
    getAllOrganizationReducer,blockUnblockReducer,cancelSubscriptionReducer,blockUnblockPartnerReducer,deleteEventReducer,
    sendFirebasePushNotificationsReducer,postStaticDataReducer,getStaticDataByReducer,getAllEventDetailsReducer,postEventDetailsReducer,
    deleteUserReducer,getAllPartnersReducer,deletePartnerByIdReducer,getPartnerDetailsReducer,getAllVenuesReducer,
    deleteVenueByIdReducer,getAllEventOfReservationsReducer,updatePasswordAdminReducer,getAllWaiverReducer,getAllExperiencesReducer,
    getAllGroupsReducer,
    getAllGameMastersReducer,
    postSubscriptionPackageReducer,getSubscriptionPackageReducer,updateSubscriptionPackageApiSliceReducer,
    deletePackageApiSliceReducer,addRewardSliceReducer,blockUserSliceReducer,getAllPostsSliceReducer,
    getAllCampaignsReducer,getAllCommunitiesApiReducer,deletePostApiSliceReducer,deleteCommunityApiSliceReducer,
    deleteCampaignApiSliceReducer,updateCampaignApiSliceReducer,getPostByIdApiSliceReducer,getPostChatApiSliceReducer,
    deleteChatMessageApiSliceReducer,getCommunityByIdApiSliceReducer
} from '../reducers';
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        validateUserReducer,getUserStatsSliceReducer,getAllUsersReducer,getAllOrganizerPartnersReducer,getAllEventsReducer,postOrganizationReducer,
        getAllOrganizationReducer,blockUnblockReducer,cancelSubscriptionReducer,blockUnblockPartnerReducer,deleteEventReducer,
        sendFirebasePushNotificationsReducer,postStaticDataReducer,getStaticDataByReducer,getAllEventDetailsReducer,
        postEventDetailsReducer,deleteUserReducer,getAllPartnersReducer,deletePartnerByIdReducer,getPartnerDetailsReducer,
        getAllVenuesReducer,deleteVenueByIdReducer,getAllEventOfReservationsReducer,updatePasswordAdminReducer,
        getAllWaiverReducer,getAllExperiencesReducer,getAllGroupsReducer,getAllGameMastersReducer,
        postSubscriptionPackageReducer,
        getSubscriptionPackageReducer,updateSubscriptionPackageApiSliceReducer,
        deletePackageApiSliceReducer,addRewardSliceReducer,blockUserSliceReducer,
        getAllPostsSliceReducer,getAllCampaignsReducer,getAllCommunitiesApiReducer,deletePostApiSliceReducer,
        deleteCommunityApiSliceReducer,deleteCampaignApiSliceReducer,updateCampaignApiSliceReducer,getPostByIdApiSliceReducer,
        getPostChatApiSliceReducer,deleteChatMessageApiSliceReducer,getCommunityByIdApiSliceReducer
    },
});
setupListeners(store.dispatch)

