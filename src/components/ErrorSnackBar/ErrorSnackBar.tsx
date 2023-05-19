import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {setErrorAC} from '../../app/app-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
    const dispatch=useAppDispatch()
    const error = useSelector((state: AppRootStateType) => state.app.error)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        console.log(reason)
        if (reason === 'clickaway') {
            dispatch(setErrorAC(null))
            return
        }
        dispatch(setErrorAC(null))
    }
    return (
        <Snackbar open={error !== null} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {error} 😠
            </Alert>
        </Snackbar>
    )
}
