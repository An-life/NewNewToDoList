import React, {useCallback} from 'react';
import {AddItemForTodoList} from './AddItemForTodoList';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from './state/Store';
import {FilterType} from './AppRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitletAC, removeTaskAC} from './state/task-reducer';

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterType, todoListId: string) => void
    filter: FilterType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (title: string, id: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList =React.memo( (props: PropsType) => {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootType, Array<TaskType>>(state => state.tasks[props.id]);

    let removeTodoList =useCallback( () => {
        props.removeTodoList(props.id);
    },[])
    let changeToDoListTitle =useCallback( (title: string) => {
        props.changeTodoListTitle(title, props.id);
    },[])
    let tasksForToDoList = tasks;
    if (props.filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false);
    }
    if (props.filter === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true);
    }

    return (
        <div>
            <div><EditableSpan title={props.title} onChange={changeToDoListTitle}/> <IconButton
                onClick={removeTodoList}><Delete/></IconButton></div>
            <AddItemForTodoList addItem={(title) => {
                dispatch(addTaskAC(title, props.id));
            }}/>
            <div>
                {
                    tasksForToDoList.map(t => {
                        let onChangeTitleHandler = (title: string) => {
                            dispatch(changeTaskTitletAC(t.id, title, props.id))
                        }
                        return <div className={t.isDone ? 'is-Done' : ''} key={t.id}><Checkbox onChange={(e) => {
                            let newStatus = e.currentTarget.checked;
                            dispatch(changeTaskStatusAC(newStatus, t.id, props.id))
                        }}
                                                                                               color={'primary'}
                                                                                               checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <IconButton onClick={() => {
                                dispatch(removeTaskAC(t.id, props.id))
                            }}><Delete/></IconButton></div>
                    })
                }
            </div>
            <Button color={'inherit'} variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={() => {
                props.changeFilter('all', props.id)
            }}>All</Button>
            <Button color={'primary'} variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={() => {
                props.changeFilter('active', props.id)
            }}>Active</Button>
            <Button color={'secondary'} variant={props.filter === 'completed' ? 'outlined' : 'text'} onClick={() => {
                props.changeFilter('completed', props.id)
            }}>Completed</Button>
        </div>
    )
})

