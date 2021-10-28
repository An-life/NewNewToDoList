import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {ToDoList} from './ToDoList';
import {AddItemForTodoList} from './AddItemForTodoList';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTaskAC, changeTaskStatusAC, changeTaskTitletAC, removeTaskAC, taskReducer} from './state/task-reducer';
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistReducer
} from './state/todolistreducer';

export type FilterType = 'all' | 'active' | 'completed'
export type TodoType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function AppWithUseReducer() {
//state
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [tasksObj, dispatchToTodolist] = useReducer(taskReducer,{
        [todoListId1]: [{id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'React', isDone: false}],
        [todoListId2]: [{id: v1(), title: 'You', isDone: true},
            {id: v1(), title: 'Cook', isDone: false},
            {id: v1(), title: 'React', isDone: false}]
    });

    let [todoLists, dispatchToTask] = useReducer(todolistReducer,
        [{id: todoListId1, title: 'What to bye', filter: 'all'},
            {id: todoListId2, title: 'What to read', filter: 'all'}])


//удаление таски
    function removeTask(id: string, todoListId: string) {
        let action=removeTaskAC (id,todoListId);
        dispatchToTask(action);
    }

//добавление таски
    function addTask(title: string, todoListId: string) {
        let action=addTaskAC (title, todoListId);
        dispatchToTask(action);
    }

//фильтрация тасок
    function changeFilter(value: FilterType, todoListId: string) {
        let action=changeFilterTodolistAC(value, todoListId);
        dispatchToTodolist(action);
    }


//изменение статуса таски
    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        let action= changeTaskStatusAC(isDone, id,  todoListId);
        dispatchToTask(action);
    }

    function changeTasTitle(id: string, newValue: string, todoListId: string) {
        let action= changeTaskTitletAC( id, newValue,  todoListId);
        dispatchToTask(action);
    }

    //удаление тудулиста
    function removeTodoList(todoListId: string) {
        let action=removeTodolistAC( todoListId);
        dispatchToTodolist(action);
        dispatchToTask(action);

    }

    function changeTodoListTitle(id: string, title: string) {
        let action=changeTitleTodolistAC( id,title);
        dispatchToTodolist(action);
    }

    function addTodoList(title: string) {
        let action=addTodolistAC(title);
        dispatchToTodolist(action);
        dispatchToTask(action);
    }


    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} area-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForTodoList addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let tasksForToDoList = tasksObj[tl.id];
                        if (tl.filter === 'active') {
                            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false);
                        }
                        if (tl.filter === 'completed') {
                            tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true);
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <ToDoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForToDoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    filter={tl.filter}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTasTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                /></Paper>
                        </Grid>
                    })}</Grid>
            </Container>
        </div>)
}

export default AppWithUseReducer;
