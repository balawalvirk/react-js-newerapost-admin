import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {blockUnblock, blockUnblockPartner, getAllOrganizerPartners, getAllUsers} from "../../services";
import {
    blockUnblockPartnerReducer, blockUnblockPartnerReset,
    blockUnblockReset,
    cancelSubscriptionReset,
    getAllOrganizerPartnersReset,
    getAllUsersReset, updateOrganizerPartner, updateUser
} from "../../reducers";
import {getFormattedDate} from "../../utils";
import {CustomButtonSquareSmall} from "../common/CustomButton";
import React from "react";
import {baseFileUrl} from "../../constants/service";
import ListViewer from "../common/ListViewer";
import Loader from "../common/Loader";
import Button from "@mui/material/Button/Button";
import ResponsiveConfirmationDialog from "../common/ResponsiveConfirmation";


const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}


const OrganizerPartner = (props) => {
    const dispatch = useDispatch()
    const {data, loading, error} = useSelector((state) => state.getAllOrganizerPartnersReducer);
    const {data:blockUnblockData, loading:blockUnblockLoading, error:blockUnblockError} = useSelector((state) => state.blockUnblockPartnerReducer);
    const [selectedUser,setSelectedUser]=useState(null);
    const [confirmation, setConfirmation] = useState(initialConfirmation);

    useEffect(() => {
        dispatch(getAllOrganizerPartners());
        return function cleanup() {
            dispatch(getAllOrganizerPartnersReset());
            dispatch(blockUnblockPartnerReset());
        };
    }, []);


    useEffect(()=>{
        if(blockUnblockError){
            setConfirmation({
                show: true,
                title: "Error",
                text: blockUnblockError
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(blockUnblockPartnerReset())
        }else if(blockUnblockData){
            if(selectedUser){
                const selectedPartnerId= selectedUser.user && selectedUser.user.partnerId && selectedUser.user.partnerId.id;
                let parsedData=JSON.parse(JSON.stringify(data));
                if(selectedPartnerId)
                    parsedData=parsedData.map((data)=>{
                        if(data.partnerId && (data.partnerId.id).toString()===selectedPartnerId.toString()){
                            data.partnerId.block=selectedUser.user.partnerId.block;
                        }
                        return data;
                    })
                dispatch(updateOrganizerPartner(parsedData));
            }
            dispatch(blockUnblockPartnerReset())

        }
    },[blockUnblockData,blockUnblockLoading])




    const handleBlockUnblock=(id)=>{

        const selectedUserIndex=data.findIndex((d)=>d.partnerId && (d.partnerId.id).toString()===id.toString())
        let selectedUser=JSON.parse(JSON.stringify(data[selectedUserIndex]));
        selectedUser.partnerId.block=!selectedUser.partnerId.block

        setConfirmation({
            show: true,
            title: "Confirmation",
            text: `Are you sure you want to ${!selectedUser.partnerId.block?"unblock":"block"} this user?`
            ,
            data: {},
            isUpdate: false,
            buttonYes:
                <Button autoFocus onClick={(e) => {
                    dispatch(blockUnblockPartner({block:selectedUser.partnerId.block,user:selectedUser.partnerId.id}));
                    setSelectedUser({index:selectedUserIndex,user:selectedUser});
                    setConfirmation(initialConfirmation)
                }}>ok</Button>,
            buttonNo:<Button autoFocus onClick={(e) => {
                setConfirmation(initialConfirmation)
            }}>cancel</Button>
        });
    }



    let filteredData = [];
    filteredData = data && data.length > 0 && data.filter((d)=>d.partnerId).map((d, index) => ({
        index: index + 1,
        logo: <img style={{width:"48px"}} src={`${baseFileUrl}/${d.logoUrl}`}/>,
        singUpDate: d.partnerId && getFormattedDate(d.partnerId.created_at),
        organizerName: d.organizerName,
        organizerBio: d.organizerBio,
        block: d.partnerId.block ?
            <span onClick={(e) => handleBlockUnblock(d.partnerId.id)}><CustomButtonSquareSmall text={"Unblock"}/></span> :
            <span onClick={(e) => handleBlockUnblock(d.partnerId.id)}><CustomButtonSquareSmall color={"red"}
                                                                                      text={"Block"}/></span>
    }))

    return (
        <>
            {(loading || blockUnblockLoading) && <Loader/>}
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
                            columns={["No", "Logo", "SignUp Date", "Name", "Bio", "Block/ Unblock"]}
                            keys={["index", "logo", "singUpDate", "organizerName", "organizerBio", "block"]}
                            searchField={"organizerName"}/>
            }
        </>
    )
}

export default OrganizerPartner;