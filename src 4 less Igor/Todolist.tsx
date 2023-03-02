import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (text: string) => void
    changeStatus: (taskID: string, newIsDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

//STATE

    let [input, setInput] = useState('')
    let [error, setError] = useState<string | null>(null)

//CONSTANTS

    const onClickAddTask = () => {
        if (input.trim() !== '') {
            props.addTask(input.trim())
            setInput('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }
    const onKeyPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') onClickAddTask()
    }
    const onClickFilterAll = () => {
        props.changeFilter('all')
    }
    const onClickFilterActive = () => {
        props.changeFilter('active')
    }
    const onClickFilterCompleted = () => {
        props.changeFilter('completed')
    }
    const onChangeCheckboxHandler = (taskID: string, newIsDone: boolean) => {
        props.changeStatus(taskID, newIsDone)
    }

//JSX
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? 'error' : ''}
                   value={input}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressEnter}
            />
            <button onClick={onClickAddTask}>Add</button>
            {error && <div className="errorMessage">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map((t) => {
                    const onClickRemoveTask = () => props.removeTask(t.id)
                    return (
                        <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    onChangeCheckboxHandler(t.id, e.currentTarget.checked)}
                                checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickRemoveTask}>x</button>
                        </li>)
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'activeFilter' : ''}
                    onClick={onClickFilterAll}>
                All
            </button>
            <button className={props.filter === 'active' ? 'activeFilter' : ''}
                    onClick={onClickFilterActive}>
                Active
            </button>
            <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                    onClick={onClickFilterCompleted}>
                Completed
            </button>
        </div>
    </div>
}
