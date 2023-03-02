import React, {ChangeEvent, FC} from 'react';
import todoList, {TaskType} from "./TodoList";

type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todoListId: string) => void
}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
        ? props.tasks.map((task) => {
            const taskClasses = task.isDone ? "task task-done" : "task"
            const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId )
            return (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}
                    />
                    <span className={taskClasses}>{task.title}</span>
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

export default TasksList;