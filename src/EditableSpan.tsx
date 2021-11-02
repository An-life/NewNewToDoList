import React, {ChangeEvent, useCallback, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export let EditableSpan =React.memo( (props: EditableSpanType) => {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title);

    let activateEditMode =useCallback( () => {
        setEditMode(true);
        setTitle(props.title)
    },[])

    let activateViewMode =useCallback( () => {
        setEditMode(false);
        props.onChange(title);
    },[])

    let onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value),[])

    return editMode ?
        <TextField variant={'outlined'} value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus/> :
        <span onDoubleClick={activateEditMode}>{title}</span>

})