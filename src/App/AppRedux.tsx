import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ToDoList} from '../features/TodoLists/ToDoList';
import {AddItemForTodoList} from '../Components/AddItemForm/AddItemForTodoList';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
     addTodoListsTC,
    changeFilterTodolistAC,
     changeTodoListTitleTC, fetchTodoListsTC, FilterType,
    removeTodoListsTC, TodoListDomainType
} from '../state/todolistreducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from '../state/Store';
import {TaskType} from '../API/todoList-api';

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
        dispatch( removeTodoListsTC(todoListId));
    }, [dispatch])
    //изменение название тудулиста
    let changeTodoListTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodoListTitleTC(title, id));
    }, [dispatch])
    //дабавление тудулиста
    let addTodoList = useCallback((title: string) => {
        dispatch(addTodoListsTC(title));
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

