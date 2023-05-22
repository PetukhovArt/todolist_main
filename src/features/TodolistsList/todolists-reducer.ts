import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux';
import {RequestStatusType, setErrorAC, setRequestStatusAC} from '../../app/app-reducer';
import {RootActionsType} from '../../app/store';
import {addTaskAC} from './tasks-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

//Action Creators =============================
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', id: todolistId}) as const
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist}) as const
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}) as const
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}) as const
export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOS', todolists: todolists}) as const

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'SET-ENTITY-STATUS', id, entityStatus}) as const

//THUNK =============================
export const fetchTodolistsTC = () => (dispatch: Dispatch<RootActionsType>) => {
    dispatch(setRequestStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setRequestStatusAC('succeeded'))
        })
        .catch(e => handleServerNetworkError(e, dispatch))
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<RootActionsType>) => {
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    dispatch(setRequestStatusAC('loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setRequestStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => handleServerNetworkError(e, dispatch))
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<RootActionsType>) => {
    dispatch(setRequestStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item));
                dispatch(setRequestStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => handleServerNetworkError(e, dispatch))
}

export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<RootActionsType>) => {
    dispatch(setRequestStatusAC('loading'))
    todolistsAPI.updateTodolist(id, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setRequestStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => handleServerNetworkError(e, dispatch))
}

//REDUCER  =============================
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsType)
    : Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'SET-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state;
    }
}

//TYPES =============================
export type TodolistActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
