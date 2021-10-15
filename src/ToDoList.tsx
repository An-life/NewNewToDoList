import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterType} from './App';
import {AddItemForTodoList} from './AddItemForTodoList';
import {EditableSpan} from './EditableSpan';

type PropsType={
    id:string
    title:string
    tasks:Array<TaskType>
    removeTask:(id:string,todoListId:string)=>void
    changeFilter:(value:FilterType,todoListId:string)=>void
    addTask:(title:string,todoListId:string)=>void,
    changeTaskStatus:(id:string,isDone:boolean,todoListId:string)=>void
    changeTaskTitle:(id:string,newValue:string,todoListId:string)=>void
    filter:FilterType
    removeTodoList:(todoListId:string)=>void
    changeTodoListTitle:(title:string,id:string)=>void
}
 export type TaskType={
    id:string
    title:string
    isDone:boolean
}



export const ToDoList=(props:PropsType)=>{

    let addTask=(title:string)=>{
        props.addTask(props.title,props.id)
    }

    let onChangeStatus= (t: TaskType, e:ChangeEvent<HTMLInputElement>) => {
        let newStatus=e.currentTarget.checked;
        props.changeTaskStatus(t.id,newStatus,props.id);
    }

    let removeTodoList=()=>{
        props.removeTodoList(props.id);
    }
    let changeToDoListTitle=(title:string)=>{
        props.changeTodoListTitle(props.id,title);

    }
    let onChangeTitleHandler= (title:string) => {
        props.changeTaskTitle(props.id,title,props.id);
    }

    return(
        <div>
            <div><EditableSpan title={props.title} onChange={ changeToDoListTitle}/><button onClick={removeTodoList}>x</button></div>
            <AddItemForTodoList   addItem={addTask} />
            <ul>
                {
                    props.tasks.map(t=><li className={t.isDone?'is-Done':''} key={t.id}><input onChange={(e) => onChangeStatus(t, e)} type="checkbox" checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                    <button onClick={()=>{props.removeTask(t.id, props.id)}}>x</button></li>)
                }
            </ul>
            <button className={props.filter==='all'?'is-active':''} onClick={()=>{props.changeFilter('all',props.id )}}>All</button>
            <button  className={props.filter==='active'?'is-active':''} onClick={()=>{props.changeFilter('active',props.id)}}>Active</button>
            <button  className={props.filter==='completed'?'is-active':''} onClick={()=>{props.changeFilter('completed',props.id)}}>Completed</button>

        </div>
    )
}

