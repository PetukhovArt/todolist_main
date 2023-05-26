import React, {useEffect} from 'react'
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
import {AppRootStateType, useAppDispatch} from './store';
import {ErrorSnackbar} from '../components/ErrorSnackBar/ErrorSnackBar';
import {Login} from '../features/Login/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import {initializeAppTC} from './app-reducer';
import {CircularProgress} from '@mui/material';
import {logoutTC} from '../features/Login/auth-reducer';


function App() {

    const status = useSelector((state: AppRootStateType) => state.app.status)
    const isInitialized = useSelector((state: AppRootStateType) => state.app.isInitialized)
    const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        {/*<Typography variant="h6">*/}
                        {/*    News*/}
                        {/*</Typography>*/}
                    <div>
                        {!isLoggedIn && <Button color="inherit">Login</Button>}
                        {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Logout</Button>}
                    </div>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/> {/*при пустой строке*/}
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={'/404'}/>}/>
                </Routes>

            </Container>
        </div>
    );
}

export default App;
