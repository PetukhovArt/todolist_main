import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    isDone: boolean
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const taskClasses = props.isDone ? 'task task-done' : 'task'
    let [editMode, setEditeMode] = useState(false)
    let [title, setTitle] = useState('')
    const activateEditMode = () => {
        setEditeMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditeMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onPressTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && activateViewMode()
    }

    return (
        editMode ?
            <input value={title}
                   onBlur={activateViewMode}
                   autoFocus
                   onChange={onChangeTitleHandler}
                   onKeyPress={onPressTitleHandler}
            />
            : <span className={taskClasses}
                    onDoubleClick={activateEditMode}
            >
            {props.title}
    </span>

    )
}