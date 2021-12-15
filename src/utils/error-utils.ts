import {setAppErrorAC, setAppStatusAC} from "../state/appReducer";
import {ResponseType} from '../API/todoList-api'
import {Dispatch} from "redux";
import {ActionType} from "../state/task-reducer";

export const handleServerAppError = <D>(messages: Array<string>, dispatch: Dispatch<ActionType>) => {
    if (messages.length) {
        dispatch(setAppErrorAC(messages[0]))
    } else {
        dispatch(setAppErrorAC('some error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleNetworkAppError = <D>(error: { message: string }, dispatch: Dispatch<ActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
