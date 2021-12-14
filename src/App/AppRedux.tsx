import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ToDoList} from '../features/TodoLists/ToDoList';
import {AddItemForTodoList} from '../Components/AddItemForm/AddItemForTodoList'
import {
     addTodoListsTC,
    changeFilterTodolistAC,
     changeTodoListTitleTC, fetchTodoListsTC, FilterType,
    removeTodoListsTC, TodoListDomainType
} from '../state/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from '../state/Store';
import {TaskType} from '../API/todoList-api';
import  {ErrorSnackbars} from '../Components/ErrorSnakBar/ErrorSnackBar';
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Typography, Toolbar} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {RequestStatusType} from "../state/appReducer";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppRedux() {
//state
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootType, Array<TodoListDomainType>>(state => state.todolists);
    const status=useSelector<AppRootType,RequestStatusType>(state => state.app.status);

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
            <ErrorSnackbars/>

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
                {status==='loading'&&<LinearProgress />}
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

