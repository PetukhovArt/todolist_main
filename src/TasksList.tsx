import React, {ChangeEvent, FC} from 'react';
import {TaskType} from './TodoList';
import {EditableSpan} from './EditableSpan';

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newValue: string,todoListId:string) => void
}

export const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map((task) => {
                const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                    props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)

                const changeTaskTitleHandler = (newValue: string) =>
                    props.changeTaskTitle(task.id, newValue, props.todoListId)


                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler}
                        />
                        <EditableSpan title={task.title}
                                      isDone={task.isDone}
                                      onChange={changeTaskTitleHandler}
                        />
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                )
            })
            : <span>Your taskslist is empty</span>
    return (
        <ul>
            {tasksItems}
        </ul>
    );
};

