import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Alert,
    Backdrop, Button,
    Chip,
    CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Grid,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import RwAppBar from "../Component/rwAppBar";
import "./defaultSheet.css"
import {useEffect, useState} from "react";
import Space from "../Component/Space";
import {deleteTraining, getAllTraining, getTrainingByUser, getUserName} from "../RwApi";
import {renderLogin} from "../index";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';


const RwPaper = styled(Paper)({
    margin: 10,
    padding: 5
});


function ListPage(props) {

    useEffect(() => {

        if(getUserName() === null || getUserName() === undefined || getUserName() === "") {
            renderLogin();
            return;

        }


        getTrainingByUser(getUserName()).then((data) => {
            let list = []
            let i = 0
            data.forEach((data) => {

                let ListRowers = []
                data.rowers.data.forEach((data) => {
                    ListRowers.push(data.name)
                })
                data.rwf = ListRowers.join("\n")
                data.id = i
                list.push(data)
                i++
            })
            setData(list)

            setLoading(false)

        })


        if(props.mes === "add") {
            setAddAlert(true)
            setTimeout(() => {
                setAddAlert(false)
            }, 3000)
        }



    }, [props.mes])


    const [loading, setLoading] = useState(true);
    const [deletePerm, setDeletePerm] = useState(true);
    const [data, setData] = useState([{_id: 1,id: 1,date: "30.06.2023", km: 10, boat: "Boat 1",rowers: {data: [{name: "Damien"},{name: "Sava"},{name: "Damien"},{name: "Sava"}]}}]);
    const [b1, setb1] = useState("outlined");
    const [b2, setb2] = useState("filled");
    const [deleteDialog, setDeleteDialog] = useState(false);

    const [deleteData, setDeleteData] = useState("");


    const [addAlert, setAddAlert] = useState(false);


    const handleCloseDialog = () => {
        setDeleteDialog(false);
    };

    const handleCloseDialogValid = () => {

        setLoading(true)
        setDeleteDialog(false);
        deleteTraining(deleteData)

        setTimeout(() => {
            setLoading(false)
            displayTrainingByUser()
        }, 1000)


    };
    const displayAllTraining = () => {

        setb1("filled")
        setb2("outlined")
        setDeletePerm(false)
        setLoading(true)
        getAllTraining().then((data) => {
            let list = []
            let i = 0
            data.forEach((data) => {

                let ListRowers = []
                data.rowers.data.forEach((data) => {
                    ListRowers.push(data.name)
                })
                data.rwf = ListRowers.join("\n")
                data.id = i
                list.push(data)
                i++
            })
            setData(list)

            setLoading(false)

        })


    }


    const handleClick = (row) => {

        setDeleteDialog(true)
        setDeleteData(row)


    }

    const displayTrainingByUser = () => {

        setb1("outlined")
        setb2("filled")
        setDeletePerm(true)
        setLoading(true)
        getTrainingByUser(getUserName()).then((data) => {
            let list = []
            let i = 0
            data.forEach((data) => {

                let ListRowers = []
                data.rowers.data.forEach((data) => {
                    ListRowers.push(data.name)
                })
                data.rwf = ListRowers.join("\n")
                data.id = i
                list.push(data)
                i++
            })
            setData(list)

            setLoading(false)

        })
    }


    const dataDisplay = () => {

        if(deletePerm) {
            return( data.map((row) => (
                    <TableRow

                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.date}
                        </TableCell>
                        <TableCell align="right">{row.km}</TableCell>
                        <TableCell align="right">{row.boat}</TableCell>

                        <TableCell align="right">{row.rwf}</TableCell>

                        <TableCell align="right"><IconButton onClick={() => handleClick(row)}>
                            <DeleteIcon />
                        </IconButton></TableCell>

                    </TableRow>
                ))
            )
        } else {
            return( data.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.date}
                        </TableCell>
                        <TableCell align="right">{row.km}</TableCell>
                        <TableCell align="right">{row.boat}</TableCell>

                        <TableCell align="right">{row.rwf}</TableCell>

                        <TableCell align="right"></TableCell>

                    </TableRow>
                ))
            )
        }

    }

    return (
        <React.Fragment>
           <h1>Entraînement</h1>

            <RwPaper>
                <Collapse in={addAlert}>


                    <Alert severity="success">Ajouté avec succes</Alert>


                </Collapse>
                <Grid style={{textAlign:"center", marginTop: 0, marginBottom: 10}} container spacing={2}>

                    <Grid item xs={6} md={6} style={{paddingTop: 5}}>
                        <Chip style={{width: "80%", margin: 10}} variant={b2}  label="Les miens" onClick={(b) => displayTrainingByUser(b)} />
                    </Grid>
                    <Grid item xs={6} md={6} style={{paddingTop: 5}}>
                        <Chip style={{width: "80%", margin: 10}} variant={b1}  label="Tous" onClick={(b) => displayAllTraining(b)} />
                    </Grid>



                </Grid>

                <TableContainer component={Box}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Km</TableCell>
                                <TableCell align="right">Bateau</TableCell>
                                <TableCell align="right">Rameur</TableCell>
                                <TableCell align="right"></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                dataDisplay()
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </RwPaper>





            <Space size={100}></Space>


            <RwAppBar></RwAppBar>


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(4px)'}}
                open={loading}>

                <CircularProgress color="inherit" />
            </Backdrop>


            <Dialog
                open={deleteDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Supprimer l'entraînement"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       Ce action est irreversible. Elle supprimera cette entraînement pour tout les utilisateurs.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Annuler</Button>
                    <Button onClick={handleCloseDialogValid} autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>



        </React.Fragment>
    );
}

export default ListPage;






