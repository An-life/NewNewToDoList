import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterType} from './App';
import {AddItemForTodoList} from './AddItemForTodoList';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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
            <div><EditableSpan title={props.title} onChange={ changeToDoListTitle}/> <IconButton onClick={removeTodoList}><Delete/></IconButton></div>
            <AddItemForTodoList   addItem={addTask} />
            <div>
                {
                    props.tasks.map(t=><div className={t.isDone?'is-Done':''} key={t.id}><Checkbox onChange={(e) => onChangeStatus(t, e)} color={'primary'} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                    <IconButton onClick={()=>{props.removeTask(t.id, props.id)}}><Delete/></IconButton></div>)
                }
            </div>
            <Button color={'inherit'} variant={props.filter==='all'?'outlined':'text'} onClick={()=>{props.changeFilter('all',props.id )}}>All</Button>
            <Button  color={'primary'} variant={props.filter==='active'?'outlined':'text'} onClick={()=>{props.changeFilter('active',props.id)}}>Active</Button>
            <Button  color={'secondary'} variant={props.filter==='completed'?'outlined':'text'} onClick={()=>{props.changeFilter('completed',props.id)}}>Completed</Button>

        </div>
    )
}

