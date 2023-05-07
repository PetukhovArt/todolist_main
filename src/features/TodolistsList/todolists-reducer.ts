import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux';


const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

//REDUCER  =============================
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsType)
    : Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl=> tl.id=== action.id ? {...tl, title: action.title}: tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl=> tl.id=== action.id ? {...tl, filter: action.filter}: tl)
        case 'SET-TODOS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state;
    }
}

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

//THUNK =============================
export const fetchTodolistsTC = () => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistsAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => dispatch(removeTodolistAC(todolistId)))
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistActionsType>) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {
            console.log(res.data.data.item)
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<TodolistActionsType>)=> {
    todolistsAPI.updateTodolist(id, title)
        .then(()=> dispatch(changeTodolistTitleAC(id,title)))
}

//TYPES =============================
type TodolistActionsType = ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
