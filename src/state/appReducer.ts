import React from 'react';
import {ActionType} from './task-reducer';
//reducer
export const appReducer=(state:InitialStateType=initialState,action:ActionType):InitialStateType=>{
    switch (action.type){
        case 'APP/SET-STATUS':
            return {
                ...state, status:action.status
            }
        case 'APP/SET-ERROR':
            return {
                ...state, error:action.error
            }
        default:
            return {...state}
    }
}

//actionCreators
export const setAppErrorAC=(error:string|null)=>({type:'APP/SET-ERROR',error}as const)
export const setAppStatusAC=(status:'idle'|'loading'|'succeeded'|'failed')=>({type:'APP/SET-STATUS',status}as const)

//types
export type RequestStatusType='idle'|'loading'|'succeeded'|'failed'
export type InitialStateType={
    status:RequestStatusType,
    error:string|null
}
const initialState:InitialStateType={
    status:'idle',
    error:null
}