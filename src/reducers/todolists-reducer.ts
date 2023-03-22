import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListAT= {
    type : 'REMOVE-TODOLIST',
    id: string
}
export type AddTodoListAT={
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodoListTitle={
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type TodoListFilter={
    type: 'TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitle | TodoListFilter

export const todolistsReducer = (todolists: Array<TodolistType>, action:ActionType ):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            let newTodolistId = v1();
                let newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter: 'all'};
                    return [ ...todolists, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
                return todolists.map(tl=> tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'TODOLIST-FILTER':
            return todolists.map(tl=> tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default: return todolists
    }
    return todolists;
}

export const RemoveTodolistAC=(id: string, ): RemoveTodoListAT =>
     ({type: "REMOVE-TODOLIST", id})
export const AddTodolistAC=(title: string, ): AddTodoListAT =>
    ({type: "ADD-TODOLIST", title})
export const ChangeTodolistTitleAC=(id: string, title: string ): ChangeTodoListTitle =>
    ({type: "CHANGE-TODOLIST-TITLE", id, title})
export const TodoListFilterAC=(id: string, filter: FilterValuesType ): TodoListFilter =>
    ({type: "TODOLIST-FILTER", id, filter})