import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Autocomplete, Backdrop, Button, Chip, CircularProgress, Grid, Paper, TextField} from "@mui/material";
import RwAppBar from "../Component/rwAppBar";
import "./defaultSheet.css"
import {useEffect, useState} from "react";
import Space from "../Component/Space";
import {getAllUser, getUserByName, getUserName, login} from "../RwApi";
import {renderHome, renderLogin} from "../index";

const RwPaper = styled(Paper)({
    margin: 25,
    padding: 15
});


function LoginPage() {

    useEffect(() => {

        getAllUser().then((data) => {
            let UserList = [];
            data.forEach((user) => {
                UserList.push(user.name)
            })
            setUserList(UserList);
            setLoading(false);
        })






    }, [])

    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState(true);
    const [UserList, setUserList] = useState([]);


    return (
        <React.Fragment>
           <h1>Connection</h1>

            <RwPaper>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Autocomplete
                            disablePortal
                            options={UserList}
                            inputValue={userName}
                            onInputChange={(event, newInputValue) => {
                                setUserName(newInputValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Utilisateur" variant="outlined"/>}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => {
                            login(userName);
                            renderHome();
                        }} variant="outlined">Se Connecter</Button>
                    </Grid>
                </Grid>

            </RwPaper>



            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(4px)'}}
                open={loading}>

                <CircularProgress color="inherit" />
            </Backdrop>


        </React.Fragment>
    );
}

export default LoginPage;






