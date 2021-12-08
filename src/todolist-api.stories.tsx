import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todoListApi} from './API/todoList-api';

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.getTodolist()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todoListApi.createTodolist('My list')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId='';
        todoListApi.deleteTodoList(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId='';
        todoListApi.updateTodoList(todolistId,'My book')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoListId=''
        todoListApi.getTasks(todoListId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, setTodoListId] = useState<any>('')

    const deleteTask=() => {
        let todolistId='';
        let taskId=''
        todoListApi.deleteTask(todolistId,taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId} onChange={(e)=>{setTodoListId(e.currentTarget.value)}}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>

}
