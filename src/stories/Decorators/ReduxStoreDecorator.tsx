import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';

import {v1} from 'uuid';
import {todolistReducer} from '../../state/todolistreducer';
import {taskReducer} from '../../state/task-reducer';

export type AppRootType=ReturnType<typeof rootReducer>
let rootReducer=combineReducers({
    todolists:todolistReducer,
    tasks:taskReducer
})

const initialGlobalState={
    todolists:[
        {id:'todolistId1',title:'What to learn',filter:'all'},
        {id:'todolistId2',title:'What to bue',filter:'all'}
    ],
    tasks:{
        ['todolistId1']:[
            {id:v1(),title:'Wghj',isDone:true},
            {id:v1(),title:'Wghhhh',isDone:true}
        ],
        ['todolistId2']:[
            {id:v1(),title:'Wfgfhg',isDone:true},
            {id:v1(),title:'Wghggg',isDone:false}
        ]
    }
}



export const StorybookStore = createStore(rootReducer,initialGlobalState as AppRootType);

export const ReduxStoreDecorator=(storyFn:any)=>{
    return <Provider store={StorybookStore}>{storyFn()}</Provider>}