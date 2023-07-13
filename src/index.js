import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from "./Pages/HomePage";
import {createTheme, ThemeProvider} from "@mui/material";
import {createTrainig, createUser, deleteUser, login, resetKm} from "./RwApi";
import ListPage from "./Pages/ListPage";
import LoginPage from "./Pages/LoginPage";
import SettingsPage from "./Pages/SettingsPage";
import AddPage from "./Pages/AddPage";


const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#3949ab',
        },
        success: {
            main: '#009688',
        },
        warning: {
            main: '#ff7043',
        },
        error: {
            main: '#e53935',
        },
        background: {
            default: '#eeeeee',
        },
    },
});






const root = ReactDOM.createRoot(document.getElementById('root'));

renderHome();



export function renderHome(mes) {


    root.render(

        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <HomePage/>
            </ThemeProvider>
        </React.StrictMode>
    );

    if(mes === "reset") {
        root.render(

            <React.StrictMode>
                <ThemeProvider theme={theme}>
                    <HomePage mes={"reset"}/>
                </ThemeProvider>
            </React.StrictMode>
        );
    }
}

export function renderList(mes) {
    root.render(

        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <ListPage/>
            </ThemeProvider>
        </React.StrictMode>
    );


    if(mes === "add") {
        root.render(

            <React.StrictMode>
                <ThemeProvider theme={theme}>
                    <ListPage mes={"add"}/>
                </ThemeProvider>
            </React.StrictMode>
        );
    }

}

export function renderLogin(mes) {
    root.render(

        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <LoginPage/>
            </ThemeProvider>
        </React.StrictMode>
    );

    if(mes === "logout") {
        root.render(

            <React.StrictMode>
                <ThemeProvider theme={theme}>
                    <LoginPage mes={"logout"}/>
                </ThemeProvider>
            </React.StrictMode>
        );
    }


}



export function renderSetings() {
    root.render(

        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <SettingsPage/>
            </ThemeProvider>
        </React.StrictMode>
    );

}


export function renderAdd() {
    root.render(

        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <AddPage/>
            </ThemeProvider>
        </React.StrictMode>
    );




}
