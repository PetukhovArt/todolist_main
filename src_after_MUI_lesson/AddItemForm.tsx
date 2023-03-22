import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const maxLengthUserMessage: number = 15
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const inputErrorClasses = error || isUserMessageToLong ? 'input-error' : ''
    const userMaxLengthMessage = isUserMessageToLong && <div style={{color: 'hotpink'}}>Task title is too long!</div>
    const userErrorMessage = error && <div style={{color: 'hotpink'}}>Title is required!</div>
    const isAddBtnDisabled = title.length === 0
    const isInputShowError = isUserMessageToLong || error
    const helperText = (error && 'Title is required!') || (isUserMessageToLong && 'Task title is too long!')

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    return (
        <div>
            <TextField
                fullWidth={false}
                color="primary"
                size="small"
                value={title}
                placeholder="Please, enter title"
                onChange={changeLocalTitle}
                onKeyDown={onKeyDownAddTask}
                // className={inputErrorClasses}
                error={isInputShowError}
                helperText={helperText} // error text under input
            />
            <IconButton size="small"
                        color="primary"
                        onClick={addTask}
                        disabled={isAddBtnDisabled}
            >
                <AddBoxIcon/>
            </IconButton>
            {/*{userMaxLengthMessage}*/}
            {/*{userErrorMessage}*/}
        </div>
    )
}