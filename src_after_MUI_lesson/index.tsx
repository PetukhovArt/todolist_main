import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {dark} from '@mui/material/styles/createPalette';
import {teal,indigo} from '@mui/material/colors';

const newTheme = createTheme({
    palette: {
        mode: "dark",
        primary: teal,
        secondary: indigo,
    }
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={newTheme}>
        <CssBaseline/>
        <App/>
    </ThemeProvider>
);

