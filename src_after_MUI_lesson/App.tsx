import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import {Menu} from '@mui/icons-material';

// CRUD
// R - filter, sort, search

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: TaskType[]
}

function App(): JSX.Element {
    //newBLL:
    let todoListId_1 = v1()
    let todoListId_2 = v1()
    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'ES6 & TS', isDone: true},
            {id: v1(), title: 'React & Redux', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Chicken', isDone: false},
        ]
    })

    const changeFilterValue = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map((tl) =>
            tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
        //копия таскс , по айди тудулиста присваиваем значение отфильтрованного тудулиста
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId]
                .map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        })
    }
    const changeTaskTitle = (taskId: string, newValue: string, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId]
                .map(t => t.id === taskId ? {...t, title: newValue} : t)
        })
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
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId] //delete tasks of deleted todolist ( don't need immutability)
    }
    const changeTodoListTitle = (id: string, newTitle: string) => {
        const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function addTodoList(title: string) {
        let todolist: TodoListsType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoLists([todolist, ...todoLists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }

    //UI:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container sx={{p: '10px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={2}>
                    {todoLists.map(tl => {
                        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)
                        return (
                            <Grid item>
                            <Paper sx={{p:"20px"}} elevation={8}>
                                <TodoList
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
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

    export default App;
