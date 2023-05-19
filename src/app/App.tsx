import React from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import LinearProgress from '@mui/material/LinearProgress';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {ErrorSnackbar} from '../components/ErrorSnackBar/ErrorSnackBar';
import {Login} from '../features/Login/Login';
import {Navigate, Route, Routes} from 'react-router-dom';


function App() {

    const status = useSelector((state: AppRootStateType) => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/> {/*при пустой строке*/}
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={'/404'}/>} />
                </Routes>

            </Container>
        </div>
    );
}

export default App;
