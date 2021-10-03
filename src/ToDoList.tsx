import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterType} from './App';

type PropsType={
    id:string
    title:string
    tasks:Array<TaskType>
    removeTask:(id:string,todoListId:string)=>void
    changeFilter:(value:FilterType,todoListId:string)=>void
    addTask:(title:string,todoListId:string)=>void,
    changeTaskStatus:(id:string,isDone:boolean,todoListId:string)=>void
    filter:FilterType
    removeTodoList:(todoListId:string)=>void
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
            props.addTask(title.trim(),props.id);
            setTitle('')
        }else {
            setError('No title');
        }

    }

    let onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{setError(null); setTitle(e.currentTarget.value)};
    let onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{if(e.charCode===13){addTask();}};
    let onChangeStatus= (t: TaskType, e:ChangeEvent<HTMLInputElement>) => {
        let newStatus=e.currentTarget.checked;
        props.changeTaskStatus(t.id,newStatus,props.id);
    }
    let removeTodoList=()=>{
        props.removeTodoList(props.id);
    }

    return(
        <div>
            <div>{props.title}<button onClick={removeTodoList}>x</button></div>
            <div>
                <input  className={error?'error':''} value={title} onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                {error&&<div className={'error-message'}>{error}</div> }
            </div>
            <ul>
                {
                    props.tasks.map(t=><li className={t.isDone?'is-Done':''} key={t.id}><input onChange={(e) => onChangeStatus(t, e)} type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                    <button onClick={()=>{props.removeTask(t.id, props.id)}}>x</button></li>)
                }
            </ul>
            <button className={props.filter==='all'?'is-active':''} onClick={()=>{props.changeFilter('all',props.id )}}>All</button>
            <button  className={props.filter==='active'?'is-active':''} onClick={()=>{props.changeFilter('active',props.id)}}>Active</button>
            <button  className={props.filter==='completed'?'is-active':''} onClick={()=>{props.changeFilter('completed',props.id)}}>Completed</button>

        </div>
    )
}