import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {AddItemForTodoList} from './AddItemForTodoList';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC, fetchTodoListsTC, FilterType,
    removeTodolistAC, TodoListDomainType
} from './state/todolistreducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from './state/Store';
import {TaskType} from './API/todoList-api';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppRedux() {
//state
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootType, Array<TodoListDomainType>>(state => state.todolists);

    useEffect(() => {
        dispatch(fetchTodoListsTC())
           },[]
    )
//фильтрация тасок
    let changeFilter = useCallback((value: FilterType, todoListId: string) => {
        let action = changeFilterTodolistAC(value, todoListId);
        dispatch(action);
    }, [dispatch])
    //удаление тудулиста
    let removeTodoList = useCallback((todoListId: string) => {

        let action = removeTodolistAC(todoListId);
        dispatch(action);
    }, [dispatch])
    //изменение название тудулиста
    let changeTodoListTitle = useCallback((id: string, title: string) => {
        let action = changeTitleTodolistAC(id, title);
        dispatch(action);
    }, [dispatch])
    //дабавление тудулиста
    let addTodoList = useCallback((title: string) => {
        console.log('addTodoList')
        let action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch])

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
                    {todoLists.map(tl => {
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
