import {log} from 'util';
import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStatusType = string | null

export const setRequestStatusAC = (status: RequestStatusType) => {
    return ({type: 'APP/SET-STATUS', status}) as const
}
export const setErrorAC = (error: ErrorStatusType) =>
    ({type: 'APP/SET-ERROR', error}) as const

export const setIsInitializedAC = (value: boolean) =>
    ({type: 'APP/SET-IS-INITIALIZED', value}) as const

export type AppActionsType = ReturnType<typeof setRequestStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setIsInitializedAC>

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorStatusType,
    isInitialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setIsInitializedAC(true))
        } else {
            dispatch(setIsInitializedAC(true))
        }
    })
}


