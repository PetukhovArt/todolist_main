import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import {TasksList} from './TasksList';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {IconButton, Paper} from '@mui/material';
import {HighlightOff} from '@mui/icons-material';


type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
    changeFilterValue: (filter: FilterValuesType,todoListId: string) => void
    removeTask: (taskId: string,todoListId:string) => void
    addTask: (title: string,todoListId:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todoListId:string) => void
    removeTodoList: (todoListId:string)=> void
    changeTaskTitle: (taskId: string, newValue: string,todoListId:string) => void
    changeTodoListTitle: (id: string, newTitle:string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {
    const handlerCreator = (filter: FilterValuesType):() => void => (): void =>
        props.changeFilterValue(filter,props.todoListId)
    const addTask = (title:string) => {
        props.addTask(title, props.todoListId)
    }
    const changeTodoListTitle = (newTitle:string) => {
        props.changeTodoListTitle(props.todoListId, newTitle)
    }

    return (
        <div className={"todolist"}>
            <h3>
                <EditableSpan title={props.title} isDone={false} onChange={changeTodoListTitle} />
                <IconButton size="small"
                            onClick={()=>{props.removeTodoList(props.todoListId)}}
                            color="secondary"
                >
                    <HighlightOff/>
                </IconButton>

            </h3>
            <AddItemForm  addItem={addTask}/>
            <TasksList
                todoListId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
            />
            <div className="filter-btn-container">
                <Button size="small" variant="contained"
                        color={props.filter ==="all" ? "secondary" : "primary"}
                    // className={props.filter ==="all" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("all")}
                >All</Button>
                <Button size="small" variant="contained"
                        color={props.filter ==="active" ? "secondary" : "primary"}
                    // className={props.filter ==="active" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("active")}
                >Active</Button>
                <Button size="small" variant="contained"
                        color={props.filter ==="completed" ? "secondary" : "primary"}
                    // className={props.filter ==="completed" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("completed")}
                >Completed</Button>
            </div>
        </div>
    );
};

export default TodoList;