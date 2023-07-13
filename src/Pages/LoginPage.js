import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Alert,
    Autocomplete,
    Backdrop,
    Button,
    Chip,
    CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    TextField
} from "@mui/material";
import RwAppBar from "../Component/rwAppBar";
import "./defaultSheet.css"
import {useEffect, useState} from "react";
import Space from "../Component/Space";
import {createUser, getAllUser, getUserByName, getUserName, login} from "../RwApi";
import {renderHome, renderLogin} from "../index";

const RwPaper = styled(Paper)({
    margin: 25,
    padding: 15
});


function LoginPage(props) {

    useEffect(() => {

        getAllUser().then((data) => {
            let UserList = [];
            data.forEach((user) => {
                UserList.push(user.name)
            })
            setUserList(UserList);
            setLoading(false);
        })


        if(props.mes === "logout") {
            setDisconectAlert(true);
            setTimeout(() => {
                setDisconectAlert(false);
            }, 3000);
        }




    }, [])

    const [loading, setLoading] = useState(true);
    const [dg, setdg] = useState(false);
    const [userName, setUserName] = useState();
    const [newName, setNewName] = useState();
    const [UserList, setUserList] = useState([]);

    const [disconectAlert, setDisconectAlert] = useState(false);
    const [userNameAlert, setUserNameAlert] = useState(false);

    const handleClose = () => {
        setdg(false);
    };



    return (
        <React.Fragment>
           <h1>Connection</h1>

            <RwPaper>



                <Grid container spacing={2}>


                    <Grid item xs={12}>
                        <Collapse in={disconectAlert}>


                            <Alert severity="success">Déconnecté avec succes</Alert>


                        </Collapse>
                    </Grid>

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
                        <Button style={{marginLeft: 10}} size={"small"} onClick={() => {
                            setdg(true);
                        }}>S'inscrire</Button>
                    </Grid>


                </Grid>

            </RwPaper>

            <Dialog open={dg} onClose={handleClose}>
                <DialogTitle>S'inscrire</DialogTitle>
                <DialogContent>
                    <Collapse in={userNameAlert}>


                        <Alert severity="error">Ce nom est déjà pris</Alert>


                    </Collapse>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nom"
                        fullWidth
                        variant="standard"
                        value={newName}
                        onChange={(event) => {
                            setNewName(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={() => {
                        if(UserList.includes(newName)) {
                            setUserNameAlert(true);
                        } else {
                            setLoading(true);
                            createUser(newName).then(() => {
                                setTimeout(() => {
                                    login(newName);
                                    renderHome();
                                    setLoading(false);
                                }, 1000);


                            });

                        }

                    }}>S'inscrire</Button>
                </DialogActions>
            </Dialog>



            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(4px)'}}
                open={loading}>

                <CircularProgress color="inherit" />
            </Backdrop>


        </React.Fragment>
    );
}

export default LoginPage;






