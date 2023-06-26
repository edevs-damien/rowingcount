import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Chip, Grid, Paper} from "@mui/material";
import RwAppBar from "../Component/rwAppBar";
import "./defaultSheet.css"

const RwPaper = styled(Paper)({
    margin: 25,
    padding: 15
});


function HomePage() {
    return (
        <React.Fragment>
           <h1>Bonjour Damien</h1>

            <RwPaper>
                <h2>Résultat Personel</h2>

                <Grid  container spacing={1} rowSpacing={3} >
                    <Grid style={{textAlign: "left"}}  item xs={6}>
                        <Chip style={{marginLeft: "15%", fontSize: 25}}  size="medium" label="800 Km" />
                    </Grid>
                    <Grid style={{textAlign: "right"}} item xs={6}>
                        <Chip  style={{marginRight: "15%",fontSize: 25}}  size="medium" label="100 Sortie" />
                    </Grid>
                    <Grid  item xs={12}>
                        <Chip style={{width: "86%", marginRight: "7%",marginLeft: "7%"}} color="secondary"  size="medium" variant="outlined"  label="depuis le 06.04.2023" />
                    </Grid>


                </Grid>
            </RwPaper>


            <RwPaper>
                <h2>Classement</h2>


            </RwPaper>


            <RwAppBar></RwAppBar>



        </React.Fragment>
    );
}

export default HomePage;






