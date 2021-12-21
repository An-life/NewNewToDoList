import React, {useEffect} from 'react';
import './App.css';
import {fetchTodoListsTC} from '../state/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from '../state/Store';
import {TaskType} from '../API/todoList-api';
import {ErrorSnackbars} from '../Components/ErrorSnakBar/ErrorSnackBar';
import {AppBar, Button, Container, IconButton, LinearProgress, Paper, Typography, Toolbar} from "@mui/material";
import {Menu, Route, Router} from "@mui/icons-material";
import {RequestStatusType} from "../state/appReducer";
import {Login} from "../features/Login/Login";
import {ToDoLists} from "../features/TodoLists/todoLists";

//component
function AppRedux({demo = false}: PropsType) {
//state
    const dispatch = useDispatch();
    const status = useSelector<AppRootType, RequestStatusType>(state => state.app.status);
    useEffect(() => {
            dispatch(fetchTodoListsTC())
        }, []
    )

    return (
        <Router>
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
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Route  path={'/'}>
                        <ToDoLists demo={demo}/>
                    </Route>
                    <Route path={'/login'}>
                        <Login/>
                    </Route>
                </Container>
            </div>
        </Router>
    )
}

export default AppRedux;

//types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type PropsType = {
    demo?: boolean
}


