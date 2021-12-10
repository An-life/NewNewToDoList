import React, {useCallback, useEffect} from 'react';
import {AddItemForTodoList} from '../../Components/AddItemForm/AddItemForTodoList';
import {EditableSpan} from '../../Components/Editadlespan/EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from '../../state/Store';
import {addTaskTC, changeTaskTC, deleteTaskTC, fetchTasksTC,} from '../../state/task-reducer';
import {TaskStatuses, TaskType} from '../../API/todoList-api';
import {FilterType} from '../../state/todolistreducer';

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterType, todoListId: string) => void
    filter: FilterType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (title: string, id: string) => void
}

export const ToDoList = React.memo((props: PropsType) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const tasks = useSelector<AppRootType, Array<TaskType>>(state => state.tasks[props.id]);
    let removeTodoList = useCallback(() => {
        props.removeTodoList(props.id);
    }, [props.removeTodoList, props.id])
    let changeToDoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id);
    }, [props.changeTodoListTitle, props.id])
    let tasksForToDoList = tasks;
    if (props.filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(t => t.status === TaskStatuses.Completed);
    }
   /* const removeTask = useCallback( (id)=>dispatch(deleteTaskTC(props.id, id)),
     [])*/
    const addTask = useCallback(function (title: string) {
        dispatch(addTaskTC(title, props.id))
    }, [])


    return (
        <div>
            <div><EditableSpan title={props.title} onChange={changeToDoListTitle}/> <IconButton
                onClick={removeTodoList}><Delete/></IconButton></div>
            <AddItemForTodoList addItem={addTask}/>
            <div>
                {
                    tasksForToDoList.map(t => {
                        let onChangeTitleHandler = (title: string) => {
                            dispatch(changeTaskTC(t.id, {title}, props.id))
                        }
                        return <div className={t.status === TaskStatuses.Completed ? 'is-Done' : ''} key={t.id}>
                            <Checkbox onChange={(e) => {
                                let newStatus = e.currentTarget.checked;
                                dispatch(changeTaskTC(t.id, {status: newStatus ? TaskStatuses.Completed : TaskStatuses.New}, props.id))
                            }}
                                      color={'primary'}
                                      checked={t.status === TaskStatuses.Completed}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <IconButton onClick={()=>{dispatch(deleteTaskTC(props.id, t.id))}}><Delete/></IconButton></div>
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

