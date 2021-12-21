import React, {useCallback, useEffect} from 'react';
import './App.css';
import {fetchTodoListsTC} from '../state/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootType} from '../state/Store';
import {TaskType} from '../API/todoList-api';
import {ErrorSnackbars} from '../Components/ErrorSnakBar/ErrorSnackBar';
import {
    AppBar,
    Button,
    Container,
    IconButton,
    LinearProgress,
    Typography,
    Toolbar,
    CircularProgress,
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {initializedAppTC, RequestStatusType} from "../state/appReducer";
import {Login} from "../features/Login/Login";
import {ToDoLists} from "../features/TodoLists/todoLists";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {logoutTC} from "../state/auth-reducer";

//component
function AppRedux({demo = false}: PropsType) {
//state
    const dispatch = useDispatch();
    const status = useSelector<AppRootType, RequestStatusType>(state => state.app.status);
    const isInitialized = useSelector<AppRootType, boolean>(state => state.app.initialized);
    const isLoggedIn = useSelector<AppRootType, boolean>(state => state.auth.isLoginIn)
    useEffect(() => {
            dispatch(fetchTodoListsTC());
            dispatch(initializedAppTC());
        }, []
    )
    let logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])
    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center'}}><CircularProgress/></div>
    }

    return (
        <BrowserRouter>
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
                        {isLoggedIn && <Button color={'inherit'} onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={"/"} element={<ToDoLists demo={demo}/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
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


