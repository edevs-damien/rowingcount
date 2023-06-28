import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from "./Pages/HomePage";
import {createTheme, ThemeProvider} from "@mui/material";
import {createTrainig, login} from "./RwApi";
import ListPage from "./Pages/ListPage";
import LoginPage from "./Pages/LoginPage";


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

renderLogin();

login("Damien")

export function renderHome() {
    root.render(

        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <HomePage/>
            </ThemeProvider>
        </React.StrictMode>
    );

}

export function renderList() {
    root.render(

        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <ListPage/>
            </ThemeProvider>
        </React.StrictMode>
    );

}

export function renderLogin() {
    root.render(

        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <LoginPage/>
            </ThemeProvider>
        </React.StrictMode>
    );

}


export function renderSetings() {
    root.render(

        <React.StrictMode>
            <ThemeProvider theme={theme}>

            </ThemeProvider>
        </React.StrictMode>
    );

}


export function renderAdd() {
    createTrainig(25, "Perle", "03.06.2023", ["Damien"])

    root.render(

        <React.StrictMode>
            <ThemeProvider theme={theme}>

            </ThemeProvider>
        </React.StrictMode>
    );

}
