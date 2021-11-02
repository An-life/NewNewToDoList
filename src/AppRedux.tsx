import React, {useCallback} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {AddItemForTodoList} from './AddItemForTodoList';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
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
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootType, Array<TodoType>>(state => state.todolists);

//фильтрация тасок
    let changeFilter=useCallback((value: FilterType, todoListId: string) =>{
        let action = changeFilterTodolistAC(value, todoListId);
        dispatch(action);
    },[])

    //удаление тудулиста
    let removeTodoList=useCallback((todoListId: string)=> {
        let action = removeTodolistAC(todoListId);
        dispatch(action);
    },[])
    //изменение название тудулиста
    let  changeTodoListTitle=useCallback((id: string, title: string)=> {
        let action = changeTitleTodolistAC(id, title);
        dispatch(action);
    },[])
    //дабавление тудулиста
    let addTodoList=useCallback((title: string)=> {
        let action = addTodolistAC(title);
        dispatch(action);
    },[])

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
                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <ToDoList
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    changeFilter={changeFilter}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}
                                /></Paper>
                        </Grid>
                    })}</Grid>
            </Container>
        </div>)
}

export default AppRedux;
