import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

//component
export const AddItemForTodoList=React.memo(({addItem,disabled=false}: AddItemForTodoListPropsType)=> {
    //state
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);
    //обработчик события

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error!== null){
            setError(null)
        }
        setTitle(e.currentTarget.value)
    }
    //обработчик события
    let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }
    // callback добавления таски
    let addTask =useCallback( () => {
        if (title.trim() !== '') {
            addItem(title);
            console.log(title)
            setTitle('')
        } else {
            setError('No title');
        }
    },[title])

    return <div>
        <TextField variant={'outlined'}
                   error={!!error} value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label={'Title'}
                   helperText={error}/>
        <IconButton color={'primary'} onClick={addTask} disabled={disabled}><AddBox/></IconButton>
    </div>
})

//types
type AddItemForTodoListPropsType = {
    addItem: (title: string) => void
    disabled?:boolean
}
