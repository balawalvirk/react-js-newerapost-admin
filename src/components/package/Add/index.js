import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllUsers, blockUnblock, getAllWaivers, validateAdmin} from "src/services";
import {blockUnblockReducer, deleteUserReducer, getAllUsersReset, validateUserSliceReset} from "src/reducers";
import ListViewer from "src/components/common/ListViewer";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Loader from "../../common/Loader";
import Grid from "@mui/material/Grid/Grid";
import {CustomButtonLarge, CustomButtonSquareSmall} from "src/components/common/CustomButton";
import Button from "@mui/material/Button/Button";
import {getFormattedDate, removeAccessToken, saveToken} from "../../../utils";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import ResponsiveConfirmationDialog from "../../common/ResponsiveConfirmation";
import {cancelSubscription, deleteUser, getAllExperiences, getAllGroupsApi} from "../../../services";
import moment from "moment";
import {CSVLink} from "react-csv";
import {CustomLabelHeaderLarge, CustomLabelNormal13} from "../../common/CustomLabel";
import {CustomTextField} from "../../common/text";
import {transformValidateObject, validateUserInput} from "../../../utils";
import {postSubscriptionPackageApi} from "../../../services";
import {postSubscriptionPackageReset} from "../../../reducers";

const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}


const initialPackage = {
    name: {value: null, error: "Name cant be empty", showError: false},
    currency: {value: null, error: "Currency cant be empty", showError: false},
    amount: {value: null, error: "Amount cant be empty", showError: false}
};


const AddPackage = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const [pack,setPack]=useState(initialPackage);
    const [count,setCount]=useState(0);
    const [confirmation, setConfirmation] = useState(initialConfirmation);


    const {data, loading, error} = useSelector((state) => state.postSubscriptionPackageReducer);

    useEffect(() => {
        return function cleanup() {
            dispatch(postSubscriptionPackageReset());
        };

    }, [])


    useEffect(() => {
        if(error){
            setConfirmation({
                show: true,
                title: "Error",
                text: "Error occurs while adding package"
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(postSubscriptionPackageReset())
        }else if(data){

            console.log("data = ",data);
            const user=data.data;

            navigate('/home/package/list',{replace: true});
            dispatch(postSubscriptionPackageReset())

        }
    }, [data,loading, error]);



    const onChange = (e, type) => {
        let data;
        let value=e.target.value
        if(type==="amount")
            value=value.replace(/\D/g, "");


        data = {...pack, [type]: {...pack[type], value: value}};
        setPack(data);
        setCount(count + 1);
    }

    const handleAddPackage = (e) => {
        const validate = validateUserInput(pack);
        if (validate.isValid) {
            const data = transformValidateObject(validate.data)
            data.amount=parseInt(data.amount)
            dispatch(postSubscriptionPackageApi(data));
        } else {
            setPack(validate.data);
            setCount(count + 1);
        }
    }


    return (
        <>
            <Grid item xs={12} container justifyContent={"center"} style={{marginTop:"50px"}}>
                {(loading) && <Loader/>}
                {
                    confirmation.show &&
                    <ResponsiveConfirmationDialog
                        title={confirmation.title} text={confirmation.text}
                        buttons={confirmation.buttonYes}
                        otherButton={confirmation.buttonNo}
                    />
                }
                <Grid item xs={12} md={5.8} container justifyContent={"center"} sx={{height:{xs:"auto",md:"100%"}}} alignItems={"center"}>
                    <Grid item xs={10} container alignItems={"center"}>
                        <Grid item xs={12} container justifyContent={"center"}>
                            <CustomLabelHeaderLarge text={"Create"} color={"black"} fontWeight={"bold"}/>
                        </Grid>
                        <Grid item xs={12} style={{marginTop:"10px"}}>
                            <CustomTextField label={"Name"}
                                             onChange={(e) => onChange(e, 'name')}
                                             error={pack.name.showError}
                                             value={pack.name.value}
                                             placeholder={""}
                                             helperText={pack.name.showError ? pack.name.error : ""}
                            />
                        </Grid>
                        <Grid item xs={12} style={{marginTop:"20px"}}>
                            <CustomTextField label={"Currency"}
                                             onChange={(e) => onChange(e, 'currency')}
                                             error={pack.currency.showError}
                                             value={pack.currency.value}
                                             placeholder={""}
                                             helperText={pack.currency.showError ? pack.currency.error : ""}
                            />
                        </Grid>
                        <Grid item xs={12} style={{marginTop:"20px"}}>
                            <CustomTextField label={"Amount"}
                                             onChange={(e) => onChange(e, 'amount')}
                                             error={pack.amount.showError}
                                             value={pack.amount.value}
                                             placeholder={""}
                                             helperText={pack.amount.showError ? pack.amount.error : ""}
                            />
                        </Grid>

                        <Grid item container justifyContent={"center"}>
                            <Grid item xs={4} style={{marginTop:"30px"}} onClick={handleAddPackage}>
                                <CustomButtonLarge text={"Create"}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </>
    )
}
export default AddPackage;
