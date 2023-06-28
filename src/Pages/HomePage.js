import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Backdrop, Chip, CircularProgress, Grid, Paper} from "@mui/material";
import RwAppBar from "../Component/rwAppBar";
import "./defaultSheet.css"
import {useEffect, useState} from "react";
import Space from "../Component/Space";
import {getAllUser, getUserByName, getUserName} from "../RwApi";
import {renderLogin} from "../index";

const RwPaper = styled(Paper)({
    margin: 25,
    padding: 15
});


function HomePage() {

    useEffect(() => {

        if(getUserName() === null || getUserName() === undefined || getUserName() === "") {
            renderLogin()
            return;
        }





        let hours = new Date().getHours();
        if (hours >= 18) setName("Bonsoir " + getUserName());
        else if (hours < 18) setName("Bonjour " + getUserName());

        getUserByName(getUserName()).then(userData => {
            setKm(userData.km + " Km");
            setLastR("depuis le " +userData.last );
            setNbt(userData.nbt + " Sorties");

            getAllUser().then(data => {
                let classData1 = data;
                let i = 1;

                classData1.sort((a, b) => {
                    return b.km - a.km;
                })

                let classData = [];
                classData1.forEach((item) => {
                    let rank = "  " + i;
                    if(i === 1) rank = "🥇";
                    if(i === 2) rank = "🥈";
                    if(i === 3) rank = "🥉";
                    classData.push({name: item.name, km: item.km + " Km", rank: rank})
                    i++;
                })



                setClassData(classData);
               setLoading(false);
            });

        })







    }, [])

    const [Name, setName] = useState("Bonjour");
    const [Km, setKm] = useState("Km");
    const [Nbt, setNbt] = useState("Sorties");
    const [LastR, setLastR] = useState("depuis le");
    const [ClassData, setClassData] = useState([{name: "Chargement", km: "Chargement", rank: "🥇"},{name: "Chargement", km: "Chargement", rank: "🥈"},{name: "Chargement", km: "Chargement", rank: "🥉"}]);
    const [loading, setLoading] = useState(true);

    return (
        <React.Fragment>
           <h1>{Name}</h1>

            <RwPaper>
                <h2>Résultat Personel</h2>

                <Grid  container spacing={1} rowSpacing={3} >
                    <Grid style={{textAlign: "left"}}  item xs={6}>
                        <Chip style={{ fontSize: 25, fontWeight: 600}}  size="medium" label={Km}/>
                    </Grid>
                    <Grid style={{textAlign: "right"}} item xs={6}>
                        <Chip  style={{fontSize: 25,fontWeight: 600}}  size="medium" label={Nbt} />
                    </Grid>
                    <Grid  item xs={12}>
                        <Chip style={{width: "100%"}} color="secondary"  size="medium" variant="outlined"  label={LastR}/>
                    </Grid>



                </Grid>
            </RwPaper>


            <RwPaper>
                <h2>Classement</h2>

                <table style={{borderSpacing: "1rem"}}>
                    <tbody>
                    {ClassData.map((item) =>{
                        return ( <tr key={item.rank}>
                            <td>{item.rank}</td>
                            <td>{item.name}</td>
                            <td><Chip size="small" style={{ fontSize: 25}} label={item.km}/></td>
                        </tr>)
                    })}


                    </tbody>
                </table>




            </RwPaper>

            <Space size={50}></Space>


            <RwAppBar></RwAppBar>


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(4px)'}}
                open={loading}>

                <CircularProgress color="inherit" />
            </Backdrop>



        </React.Fragment>
    );
}

export default HomePage;






