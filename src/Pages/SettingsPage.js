import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Autocomplete,
    Backdrop,
    Button,
    Chip,
    CircularProgress,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    TextField
} from "@mui/material";
import RwAppBar from "../Component/rwAppBar";
import "./defaultSheet.css"
import {useEffect, useState} from "react";
import Space from "../Component/Space";
import {getAllUser, getUserByName, getUserName, login, logout, resetKm} from "../RwApi";
import {renderHome, renderLogin} from "../index";

const RwPaper = styled(Paper)({
    margin: 25,
    padding: 15
});


function SettingsPage() {


    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <React.Fragment>
           <h1>Paramètre</h1>

            <RwPaper>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Button onClick={() => {
                            setOpen(true);
                        }} variant="outlined">Réinitialiser les résultats</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => {
                            logout();

                        }}  color="error" variant="outlined">Se Déconnecter</Button>
                    </Grid>
                </Grid>


            </RwPaper>

            <RwAppBar></RwAppBar>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Réinitialiser les résultats "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       Cette action est irréversible, êtes vous sur de vouloir réinitialiser les résultats ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={() => {
                        handleClose();
                        resetKm(getUserName()).then(() => {
                           setTimeout(renderHome("reset"), 500)

                        })

                    }} autoFocus color={"error"}>
                        Réinitialiser
                    </Button>
                </DialogActions>
            </Dialog>


        </React.Fragment>
    );
}

export default SettingsPage;






