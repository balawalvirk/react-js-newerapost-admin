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
import {addRewardApi} from "../../../services";
import {addRewardReset} from "../../../reducers";

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
    percentage_off: {value: 0, error: "Name cant be empty", showError: false},
    duration_in_months: {value: 0, error: "Currency cant be empty", showError: false},
};


const AddReward = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const [pack,setPack]=useState(initialPackage);
    const [count,setCount]=useState(0);
    const [confirmation, setConfirmation] = useState(initialConfirmation);
    const {state} = useLocation();
    const { id } = state; // Read values passed on state


    const {data, loading, error} = useSelector((state) => state.addRewardSliceReducer);

    useEffect(() => {
        return function cleanup() {
            dispatch(addRewardReset());
        };

    }, [])


    useEffect(() => {
        if(error){
            setConfirmation({
                show: true,
                title: "Error",
                text: "Error occurs while adding reward"
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo:null
            });
            dispatch(addRewardReset())
        }else if(data){



            setConfirmation({
                show: true,
                title: "Success",
                text: "Reward added successfully"
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation);
                        console.log("data = ",data);
                        const user=data.data;

                        navigate('/home/reward/list',{replace: true});
                        dispatch(addRewardReset())

                    }}>ok</Button>,
                buttonNo:null
            });


        }
    }, [data,loading, error]);



    const onChange = (e, type) => {
        let data;
        let value=e.target.value
        if(type==="percentage_off" || type==="duration_in_months")
            value=value.replace(/\D/g, "");


        data = {...pack, [type]: {...pack[type], value: (value),showError:false}};
        setPack(data);
        setCount(count + 1);
    }

    const handleAddReward = (e) => {
        const validate = validateUserInput(pack);
        if (validate.isValid) {



            const data = transformValidateObject(validate.data)

            if(data.percentage_off<1){
                const d = {...pack, ["percentage_off"]: {...pack["percentage_off"],showError:true, error:"Must be greater than zero"}};
                setPack(d);
                return;
            }
            if(data.duration_in_months<1){
                const d = {...pack, ["duration_in_months"]: {...pack["duration_in_months"],
                        showError:true, error:"Must be greater than zero"}};
                setPack(d);
                return;
            }

            data.percentage_off=parseInt(data.percentage_off);
            data.duration_in_months=parseInt(data.duration_in_months)

            dispatch(addRewardApi({...data,user_id:id}));
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
                            <CustomLabelHeaderLarge text={"Add"} color={"black"} fontWeight={"bold"}/>
                        </Grid>
                        <Grid item xs={12} style={{marginTop:"10px"}}>
                            <CustomTextField label={"Percentage Off"}
                                             onChange={(e) => onChange(e, 'percentage_off')}
                                             error={pack.percentage_off.showError}
                                             value={pack.percentage_off.value}
                                             placeholder={""}
                                             helperText={pack.percentage_off.showError ? pack.percentage_off.error : ""}
                            />
                        </Grid>
                        <Grid item xs={12} style={{marginTop:"20px"}}>
                            <CustomTextField label={"Duration in months"}
                                             onChange={(e) => onChange(e, 'duration_in_months')}
                                             error={pack.duration_in_months.showError}
                                             value={pack.duration_in_months.value}
                                             placeholder={""}
                                             helperText={pack.duration_in_months.showError ? pack.duration_in_months.error : ""}
                            />
                        </Grid>
                        <Grid item container justifyContent={"center"}>
                            <Grid item xs={4} style={{marginTop:"30px"}} onClick={handleAddReward}>
                                <CustomButtonLarge text={"Reward"}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </>
    )
}
export default AddReward;
