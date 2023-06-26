import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import RowingIcon from '@mui/icons-material/Rowing';
import SettingsIcon from '@mui/icons-material/Settings';
import {Grid} from "@mui/material";



const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: "60%",
    right: 0,
    margin: '0 auto',
});




function RwAppBar() {
    return (
        <React.Fragment>


            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>

                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <IconButton color="inherit" aria-label="open drawer">
                                <HomeIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton color="inherit">
                                <RowingIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={3}>
                            <IconButton color="inherit">
                                <SettingsIcon />
                            </IconButton>
                        </Grid>


                    </Grid>


                    <StyledFab color="secondary" aria-label="add">
                        <AddIcon />
                    </StyledFab>
                    <Box sx={{ flexGrow: 1 }} />




                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default RwAppBar;