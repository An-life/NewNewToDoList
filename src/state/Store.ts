import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistReducer} from './todolistreducer';
import {taskReducer} from './task-reducer';
import thunkMiddleware from 'redux-thunk';
import {appReducer} from './appReducer';

export type AppRootType=ReturnType<typeof rootReducer>
let rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:taskReducer,
    app:appReducer,
})
export let store=createStore(rootReducer,applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;