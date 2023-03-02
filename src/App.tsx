import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

// CRUD
// R - filter, sort, search

export type FilterValuesType = "all" | "active" | "completed"

type TodoListsType= {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType={
    [key:string]: Array<TaskType>
}

function App (): JSX.Element {
    //newBLL:
    let todoListId_1=v1()
    let todoListId_2=v1()
    let [todoLists, setTodoLists]=useState<Array<TodoListsType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'active'},
    ])

    let [tasks,setTasks]=useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "React & Redux", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Chiken", isDone: false},
        ]
    })

    const changeFilterValue = (filter: FilterValuesType, todoListId: string) =>{
        setTodoLists(todoLists.map((tl )=>
            tl.id === todoListId ? {...tl, filter: filter}  : tl))
    }
    const removeTask = (taskId: string, todoListId:string) => {
        setTasks({...tasks,[todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
        //копия таскс , по айди тудулиста присваиваем значение отфильтрованного тудулиста
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks,[todoListId]: [newTask,...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean,todoListId:string) => {
        setTasks({...tasks,[todoListId]: tasks[todoListId]
                .map(t =>t.id === taskId ? {...t, isDone: newIsDone}  : t )})
    }
    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType):  Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    const removeTodoList =(todoListId:string)=> {
        setTodoLists(todoLists.filter(tl=> tl.id !==todoListId))
        delete tasks[todoListId] //delete tasks of deleted todolist ( don't need immutability)
    }

    //UI:
    return (
        <div className="App">
            {todoLists.map(tl=> {
                const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id],tl.filter)
                return <TodoList
                    todoListId={tl.id}
                    key={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    filter={tl.filter}
                    changeFilterValue={changeFilterValue}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}
                />
            })}
        </div>
    );
}

export default App;
