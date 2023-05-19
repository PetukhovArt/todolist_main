import {Dispatch} from 'redux'
import {RootActionsType} from '../../app/store';
import {setErrorAC, setRequestStatusAC} from '../../app/app-reducer';
import {authAPI, LoginParamsType, todolistsAPI} from '../../api/todolists-api';
import {addTaskAC} from '../TodolistsList/tasks-reducer';
import {Navigate} from 'react-router-dom';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: RootActionsType): InitialStateType => {
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
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]));
                } else {
                    dispatch(setErrorAC('Some error occurred'));
                }
                dispatch(setRequestStatusAC('failed'))
            }
        } catch (error) {
            dispatch(setRequestStatusAC('failed'))
            dispatch(setErrorAC(error as any))
        }
}

// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>



// export const loginTC = (data: any) => async (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatusAC('loading'))
//
//     try {
//         const response = await authAPI.login(data)
//         if (response.data.resultCode === 0) {
//             dispatch(setIsLoggedInAC(true))
//             dispatch(setAppStatusAC('succeeded'))
//         } else {
//             handleServerAppError(response.data, dispatch);
//         }
//     } catch (e) {
//         handleServerNetworkError((e as any).message, dispatch);
//     }
// }
