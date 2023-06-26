import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from "./Pages/HomePage";
import {createTheme, ThemeProvider} from "@mui/material";


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
root.render(

  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <HomePage/>
      </ThemeProvider>
  </React.StrictMode>
);
