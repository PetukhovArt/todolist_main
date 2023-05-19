import {log} from 'util';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStatusType = string | null

export const setRequestStatusAC = (status: RequestStatusType) => {
   return  ({type: 'APP/SET-STATUS', status}) as const
}

export const setErrorAC = (error: ErrorStatusType) =>
    ({type: 'APP/SET-ERROR', error}) as const

export type AppActionsType = ReturnType<typeof setRequestStatusAC> | ReturnType<typeof setErrorAC>

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}


