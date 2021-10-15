import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemForTodoListPropsType={
    addItem:(title:string)=>void
}
export function AddItemForTodoList(props:AddItemForTodoListPropsType){
    let [title,setTitle]=useState('');
    let [error,setError]=useState<string|null>(null);
    let onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{setError(null); setTitle(e.currentTarget.value)};
    let onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{if(e.charCode===13){addTask();}};
    let addTask=()=>{
        if(title.trim()!==''){
            props.addItem(title.trim());
            setTitle('')
        }else {
            setError('No title');
        }

    }

    return<div>
        <input  className={error?'error':''} value={title} onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>
        <button onClick={addTask}>+</button>
        {error&&<div className={'error-message'}>{error}</div> }
    </div>
}