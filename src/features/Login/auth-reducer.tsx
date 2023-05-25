import {Dispatch} from 'redux'
import {RootActionsType} from '../../app/store';
import {setErrorAC, setRequestStatusAC} from '../../app/app-reducer';
import {authAPI, LoginParamsType, todolistsAPI} from '../../api/todolists-api';
import {addTaskAC} from '../TodolistsList/tasks-reducer';
import {Navigate} from 'react-router-dom';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

const authInitialState = {
    isLoggedIn: false
}
type InitialStateType = typeof authInitialState

export const authReducer = (state: InitialStateType = authInitialState, action: RootActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (formikValues: LoginParamsType) => async (dispatch: Dispatch<RootActionsType>) => {
    dispatch(setRequestStatusAC('loading'))
        try {
            const res = await authAPI.login(formikValues)
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setRequestStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        } catch (e) {
            handleServerNetworkError((e as any).message,dispatch)
        }
}

export const logoutTC = () => async (dispatch: Dispatch<RootActionsType>) => {
    dispatch(setRequestStatusAC('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false));
            dispatch(setRequestStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as any).message,dispatch)
    }
}

// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>

