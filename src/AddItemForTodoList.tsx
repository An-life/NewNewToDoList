import {Button, IconButton, TextField} from '@material-ui/core';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddBox} from '@material-ui/icons';

type AddItemForTodoListPropsType = {
    addItem: (title: string) => void
}

export function AddItemForTodoList(props: AddItemForTodoListPropsType) {
    //state
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);
    //обработчик события
    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    };
    //обработчик события
    let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    };
    // callback добавления таски
    let addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('')
        } else {
            setError('No title');
        }
    }

    return <div>
        <TextField variant={'outlined'}
                   error={!!error} value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label={'Title'}
                   helperText={error}/>
        <IconButton color={'primary'} onClick={addTask}><AddBox/></IconButton>
    </div>
}