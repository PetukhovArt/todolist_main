import React, {ChangeEvent, FC} from 'react';
import {TaskType} from './TodoList';
import {EditableSpan} from './EditableSpan';
import {Checkbox, IconButton, List, ListItem} from '@mui/material';
import {CheckBox, HighlightOff} from '@mui/icons-material';


type TasksListPropsType = {
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
}

function HighlightOffIcon() {
    return null;
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
                    <ListItem disablePadding={true}
                              divider={true}
                        key={task.id}>
                        <Checkbox //input
                            size='small'
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler}
                        />
                        <EditableSpan title={task.title}
                                      isDone={task.isDone}
                                      onChange={changeTaskTitleHandler}
                        />
                        <IconButton size="small"
                                    onClick={removeTaskHandler}
                                    color="primary"
                        >
                            <HighlightOff/>
                        </IconButton>
                    </ListItem>
                )
            })
            : <span>Your taskslist is empty</span>
    return (
        <List disablePadding={false}
        >
            {tasksItems}
        </List>
    );
};

