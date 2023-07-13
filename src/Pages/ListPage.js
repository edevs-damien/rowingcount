import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Alert,
    Backdrop,
    Chip,
    CircularProgress, Collapse,
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
import {getAllTraining, getTrainingByUser, getUserName} from "../RwApi";
import {renderLogin} from "../index";
import Box from "@mui/material/Box";

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
    const [data, setData] = useState([{id: 1,date: "30.06.2023", km: 10, boat: "Boat 1",rowers: {data: [{name: "Damien"},{name: "Sava"},{name: "Damien"},{name: "Sava"}]}}]);
    const [b1, setb1] = useState("outlined");
    const [b2, setb2] = useState("filled");


    const [addAlert, setAddAlert] = useState(false);
    const displayAllTraining = () => {

        setb1("filled")
        setb2("outlined")
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

    const displayTrainingByUser = () => {

        setb1("outlined")
        setb2("filled")
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

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
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

                                </TableRow>
                            ))}
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



        </React.Fragment>
    );
}

export default ListPage;






