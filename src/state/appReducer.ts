import {ActionType} from './task-reducer';
import {authAPI} from "../API/todoList-api";
import {Dispatch} from "redux";
import {AppRootType} from "./Store";
import {setiIsLoginInAC} from "./auth-reducer";

//reducer
export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {
                ...state, status: action.status
            }
        case 'APP/SET-ERROR':
            return {
                ...state, error: action.error
            }
        case "APP/SET-INITIALIZED":
            return {
                ...state, initialized: action.value
            }
        default:
            return {...state}
    }
}

//actionCreators
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: 'idle' | 'loading' | 'succeeded' | 'failed') => ({
    type: 'APP/SET-STATUS',
    status
} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)

//
export const initializedAppTC = () => (dispatch: Dispatch<ActionType>, getState: () => AppRootType) => {
    authAPI.me().then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setiIsLoginInAC(true))
        } else {

        }
        dispatch(setAppInitializedAC(true))
    })
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType,
    error: string | null
    //true if app initiolized
    initialized: boolean
}
const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    initialized: false
}