import React from 'react';
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
    removeTodolistAC
} from './state/todolistreducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from './state/Store';

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

function AppRedux() {
//state
   const dispatch=useDispatch();
   const todolists=useSelector<AppRootType,Array<TodoType>>(state=>state.todolists);
    const tasks=useSelector<AppRootType,TasksType>(state=>state.tasks);

//удаление таски
    function removeTask(id: string, todoListId: string) {

        let action = removeTaskAC(id, todoListId);
        dispatch(action);
    }

//добавление таски
    function addTask(title: string, todoListId: string) {
        debugger
        let action = addTaskAC(title, todoListId);
        dispatch(action);
    }

//фильтрация тасок
    function changeFilter(value: FilterType, todoListId: string) {
        let action = changeFilterTodolistAC(value, todoListId);
        dispatch(action);
    }


//изменение статуса таски
    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        let action = changeTaskStatusAC(isDone, id, todoListId);
        dispatch(action);
    }

    function changeTasTitle(id: string, newValue: string, todoListId: string) {
        let action = changeTaskTitletAC(id, newValue, todoListId);
        dispatch(action);
    }

    //удаление тудулиста
    function removeTodoList(todoListId: string) {
        let action = removeTodolistAC(todoListId);
        dispatch(action);


    }

    function changeTodoListTitle(id: string, title: string) {
        let action = changeTitleTodolistAC(id, title);
        dispatch(action);
    }

    function addTodoList(title: string) {
        let action = addTodolistAC(title);
        dispatch(action);

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
                <Grid container style={{padding: '20px'}}>
                    <AddItemForTodoList addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        let tasksForToDoList = tasks[tl.id];
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

export default AppRedux;
