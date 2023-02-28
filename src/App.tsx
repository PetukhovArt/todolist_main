import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';


// CRUD
// R - filter, sort, search

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId_1: string]: Array<TaskType>
}

function App(): JSX.Element {

    //BLL NEW:
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to learn', filter: 'active'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'ES6 & TS', isDone: true},
            {id: v1(), title: 'REACT & REDUX', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'MILK', isDone: true},
            {id: v1(), title: 'BREAD', isDone: true},
            {id: v1(), title: 'MEAT', isDone: false},
        ]
    })


    //BLL OLD:
    const removeTask = (taskId: string, todoListId: string) => {
        // const tasksForUpdate= tasks[todoListId] //достали массив для изменений
        // const updatedTasks= tasksForUpdate.filter(t => t.id !== taskId)
        // const copyTasks={...tasks} //копия объекта для иммутабельности
        // copyTasks[todoListId]= updatedTasks //присвоили айдишке новое значение те отфильтрованные таски (ключу)
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)}) //отрефакторили
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const tasksForUpdate = tasks[todoListId]
        // const updatedTasks = [newTask, ...tasksForUpdate]
        // setTasks({...tasks, [todoListId]: updatedTasks })
        //
        setTasks({...tasks, [todoListId]: [newTask, ...tasksForUpdate] }) //refactor
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        // const tasksForUpdate= tasks[todoListId] //достали массив для изменений
        // const updatedTasks= tasksForUpdate.map(t => t.id !== taskId ? {...t, isDone: newIsDone}: t)
        // const copyTasks={...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t=> t.id === taskId? {...t, isDone: newIsDone}: t)})
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl=> tl.id === todoListId ? {...tl, filter: filter} : tl))
    }

    const removeTodoList = (todoListId: string)=> {
        setTodoLists(todoLists.filter(tl=> tl.id !== todoListId)) //2 tl
        delete tasks[todoListId] //delete tasks of deleted todolist ( don't need immutability)
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => t.isDone === false)
            case 'completed':
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    const todoListsComponents = todoLists.map(tl=> {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                tasks={filteredTasks}
                filter={tl.filter}

                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}

                changeFilterValue={changeTodoListFilter}
                removeTodoList={removeTodoList}
            />
        )
    })

    //UI:
    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
