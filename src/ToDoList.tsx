import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterType} from './App';

type PropsType={
    title:string
    tasks:Array<TaskType>
    removeTask:(id:string)=>void
    changeFilter:(value:FilterType)=>void
    addTask:(title:string)=>void,
    changeTaskStatus:(id:string,isDone:boolean)=>void
    filter:FilterType
}
 export type TaskType={
    id:string
    title:string
    isDone:boolean
}
export const ToDoList=(props:PropsType)=>{
    let [title,setTitle]=useState('');

    let [error,setError]=useState<string|null>(null);

    let addTask=()=>{
        if(title.trim()!==''){
            props.addTask(title);
            setTitle('')
        }else {
            setError('No title');
        }

    }

    let onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{setError(null); setTitle(e.currentTarget.value)};
    let onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{if(e.charCode===13){addTask();}};
    let onChangeStatus= (t: TaskType, e:ChangeEvent<HTMLInputElement>) => {
        let newStatus=e.currentTarget.checked;
        props.changeTaskStatus(t.id,newStatus);
    }

    return(
        <div>
            <div>{props.title}</div>
            <div>
                <input  className={error?'error':''} value={title} onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                {error&&<div className={'error-message'}>{error}</div> }
            </div>
            <ul>
                {
                    props.tasks.map(t=><li className={t.isDone?'is-Done':''} key={t.id}><input onChange={(e) => onChangeStatus(t, e)} type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                    <button onClick={()=>{props.removeTask(t.id)}}>x</button></li>)
                }
            </ul>
            <button className={props.filter==='all'?'is-active':''} onClick={()=>{props.changeFilter('all')}}>All</button>
            <button  className={props.filter==='active'?'is-active':''} onClick={()=>{props.changeFilter('active')}}>Active</button>
            <button  className={props.filter==='completed'?'is-active':''} onClick={()=>{props.changeFilter('completed')}}>Completed</button>

        </div>
    )
}