import {combineReducers, createStore} from 'redux';
import {todolistReducer} from './todolistreducer';
import {taskReducer} from './task-reducer';

export type AppRootType=ReturnType<typeof rootReducer>
let rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:taskReducer
})
export let store=createStore(rootReducer);

// @ts-ignore
window.store = store;