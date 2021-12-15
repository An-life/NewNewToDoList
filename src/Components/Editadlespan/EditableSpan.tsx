import React, {ChangeEvent, useCallback, useState} from 'react';
import {TextField} from "@mui/material";

//component
export let EditableSpan = React.memo((props: EditableSpanType) => {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title);
    let activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }
    let activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode ?
        <TextField variant={'outlined'} value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/> :
        <span onDoubleClick={activateEditMode}>{title}</span>
})

//types
type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}