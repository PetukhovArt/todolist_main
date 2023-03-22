import {v1} from 'uuid';
import {
    AddTodolistAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC, TodoListFilterAC,
    todolistsReducer
} from './todolists-reducer';
import {TodolistType} from "../App";

test('correct todolist should be removed', () => {  //REMOVE TL
    // test data
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    //action

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))
    // expect
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be Added', () => {  //ADD TL
    // test data
    let todolistId1 = v1();
    let todolistId2 = v1();
    let titleTL='NewTodoList';
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]
    //action

    const endState = todolistsReducer(startState, AddTodolistAC(titleTL))
    // expect
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('NewTodoList');
});

test('First todolist title should be changed', () => {  //CHANGE TL TITLE
    // test data
    let todolistId1 = v1();
    let todolistId2 = v1();
    let NewTitle='NewTitleTodolist';
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]
    //action

    const endState = todolistsReducer(startState,  ChangeTodolistTitleAC(todolistId1,NewTitle))
    // expect
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('NewTitleTodolist');
});

test('Todolists should be filtered', () => {   //FILTER TL
    // test data
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ]
    //action

    const endState = todolistsReducer(startState, TodoListFilterAC(todolistId1, 'active'))
    // expect
    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe('active');
    expect(endState[1].filter).toBe('all');
});