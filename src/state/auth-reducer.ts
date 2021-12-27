import {Dispatch} from "redux";
import {AppRootType} from "./Store";
import {ActionType} from "./task-reducer";
import {setAppStatusAC} from "./appReducer";
import {authAPI, LoginParamsType} from "../API/todoList-api";
import {handleNetworkAppError, handleServerAppError} from "../utils/error-utils";
import {clearToDoDataAC} from "./todolist-reducer";

const initialState={
isLoginIn:false
}

//reducer
export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGIN-IN':
            return {...state, isLoginIn:action.value}
        default:
            return state;
    }
}

////actionCreators
export const setiIsLoginInAC=(value:boolean)=>({type:'SET-IS-LOGIN-IN',value}as const)

//thunkCreators
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionType>, getState: () => AppRootType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setiIsLoginInAC(true))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(clearToDoDataAC())
            } else {
                handleServerAppError(res.data.messages, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}

export const logoutTC= () => (dispatch: Dispatch<ActionType>, getState: () => AppRootType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setiIsLoginInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data.messages, dispatch)
            }
        })
        .catch((error) => {
            handleNetworkAppError(error, dispatch)
        })
}

//types
type InitialStateType={
    isLoginIn:boolean
}
