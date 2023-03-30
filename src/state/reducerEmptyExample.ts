import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type FirstActionType = {
    type: '',

}
export type SecondActionType = {
    type: '',
}


type ActionsType = FirstActionType | SecondActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case '':
            return state
        case '':
            return state
        default:
            throw new Error("I don't understand this type")
    }
}

export const firstAC = (todolistId: string): FirstActionType => {
    return { type: ''}
}
export const secondAC = (title: string): SecondActionType => {
    return { type: ''}
}

