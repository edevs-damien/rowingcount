import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Alert,
    Autocomplete,
    Backdrop,
    Button,
    Chip,
    CircularProgress,
    Collapse,
    Grid,
    Paper,
    TextField
} from "@mui/material";
import RwAppBar from "../Component/rwAppBar";
import "./defaultSheet.css"
import {useEffect, useState} from "react";
import Space from "../Component/Space";
import {createTrainig, getAllUser, getUserByName, getUserName, login} from "../RwApi";
import {renderHome, renderList, renderLogin} from "../index";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/de';

const RwPaper = styled(Paper)({
    margin: 25,
    padding: 15
});


function AddPage() {

    const [UserList, setUserList] = useState(["Loading"]);
    const [FixedUser, setFixedUser] = useState([getUserName()]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(false);
    const [Rowers, setRowers] = useState([[...FixedUser]]);
    const [Km, setKm] = useState(undefined);
    const [Date, setDate] = useState(dayjs());
    const [Boat, setBoat] = useState(undefined);

    useEffect(() => {


        getAllUser().then((data) => {
            let NameList = [];
            data.forEach(element => {
                NameList.push(element.name);
            });

            setUserList(NameList);
            setRowers([...FixedUser]);
            setLoading(false);
        })



        }, [])







    return (
        <React.Fragment>
            <h1>Nouvel Entraînement</h1>

            <RwPaper>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                            <Collapse in={alert}>


                                <Alert severity="error">Veuillez remplir tous les champs</Alert>


                            </Collapse>

                      </Grid>
                    <Grid item xs={12}>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker format="DD.MM.YYYY" sx={{width:"100%"}} views={['day','month', 'year']} defaultValue={dayjs()} value={Date} onChange={(newValue) => setDate(newValue)} />
                        </LocalizationProvider>


                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event) => {
                            setKm(event.target.value)
                        }} value={Km} label="Km" variant="outlined" fullWidth/>


                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event) => {
                            setBoat(event.target.value)
                        }} value={Boat} label="Bateau" variant="outlined" fullWidth/>

                    </Grid>

                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            id="fixed-tags-demo"
                            value={Rowers}
                            onChange={(event, newValue) => {
                                setRowers([
                                    ...FixedUser,
                                    ...newValue.filter((option) => FixedUser.indexOf(option) === -1),
                                ]);
                            }}
                            options={UserList}
                            getOptionLabel={(option) => option}
                            renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => (
                                    <Chip
                                        label={option}
                                        {...getTagProps({ index })}
                                        disabled={FixedUser.indexOf(option) !== -1}
                                    />
                                ))
                            }

                            renderInput={(params) => (
                                <TextField {...params}  />
                            )}
                        />

                    </Grid>
                    <Grid item xs={12}>

                        <Button onClick={() => {

                            if(Boat!== undefined && Km!== undefined) {
                                createTrainig(parseInt(Km), Boat, Date.toDate(), Rowers).then((data) => {
                                    setLoading(true);
                                   setTimeout(() => {
                                       setLoading(false);
                                       renderList()

                                   }, 700);
                                })
                            }else{
                                setAlert(true);
                                return;
                            }

                        }} variant="outlined">enregistrer</Button>

                    </Grid>



                </Grid>

            </RwPaper>

            <Space size={50} />

            <RwAppBar/>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(4px)'}}
                open={loading}>

                <CircularProgress color="inherit" />
            </Backdrop>





        </React.Fragment>
    );
}

export default AddPage;







