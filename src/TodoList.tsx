import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {TasksList} from './TasksList';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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
                <button onClick={()=>{props.removeTodoList(props.todoListId)}}>x</button>
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
                <button
                    className={props.filter ==="all" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("all")}
                >All</button>
                <button
                    className={props.filter ==="active" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("active")}
                >Active</button>
                <button
                    className={props.filter ==="completed" ? "active-filter-btn" : "filter-btn"}
                    onClick={handlerCreator("completed")}
                >Completed</button>
            </div>
        </div>
    );
};

export default TodoList;