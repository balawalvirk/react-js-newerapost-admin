import Grid from "@mui/material/Grid/Grid";
import {CustomLabelNormalBold26} from "../CustomLabel";
import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import {CustomTextField} from "src/components/common/text";


const SearchWithLabel=(props)=>{


    const user=props.user;

    return(
        <Grid container item xs={12}>
            <Grid item xs={4} md={6}>
                <CustomLabelNormalBold26 text={props.label} onChangeActive/>
            </Grid>
            <Grid item container xs={8} md={6} justifyContent={"flex-end"}>
                <CustomTextField
                    onChange={(e) => props.onChange(e, 'search')}
                    value={user.search.value}
                    type={"text"}
                    error={user.search.showError}
                    placeholder={props.placeholder}
                    helperText={user.search.showError ? user.search.error : ""}
                    otherInputProps={{
                        startAdornment:
                            <SearchIcon style={{color: "#919393", cursor: "pointer",paddingRight:"5px"}}/>

                    }}
                />
            </Grid>
        </Grid>
    )
}

export default SearchWithLabel;