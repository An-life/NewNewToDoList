import {ActionType} from './task-reducer';
import {todoListApi, TodoListType} from '../API/todoList-api';
import {Dispatch} from 'redux';
import {RequestStatusType, setAppStatusAC} from "./appReducer";
import {handleNetworkAppError} from "../utils/error-utils";

let initialState: Array<TodoListDomainType> = []

export const todolistReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            console.log(action.todoList)
            return [{...action.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id);
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLIST':
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
        case "CHANGE-ENTITYSTATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        default:
            return state;
    }
}

//actionCreators
export const addTodolistAC = (todoList: TodoListType) => ({type: 'ADD-TODOLIST', todoList}) as const
export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id}) as const
export const changeTitleTodolistAC = (title: string, id: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', title, id}) as const
export const changeFilterTodolistAC = (filter: FilterType, id: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', filter, id}) as const
export const setTodoListAC = (todoLists: Array<TodoListType>) =>
    ({type: 'SET-TODOLIST', todoLists}) as const
export const changeTodoListEntityStatusAC = (id: string, status: RequestStatusType) =>
    ({type: 'CHANGE-ENTITYSTATUS', id, status}) as const


//thunkCreators
export const fetchTodoListsTC = () => (dispatch: Dispatch<ActionType>) => {

    todoListApi.getTodolist()
        .then(res => {
            dispatch(setTodoListAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            handleNetworkAppError(error, dispatch)
        })
}
export const removeTodoListsTC = (todoListId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodoListEntityStatusAC(todoListId, 'loading'))
    todoListApi.deleteTodoList(todoListId)
        .then(res => {
            dispatch(removeTodolistAC(todoListId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodoListsTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todoListApi.createTodolist(title)
        .then(res => {
            console.log('res', res)
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const changeTodoListTitleTC = (newTitle: string, id: string) => (dispatch: Dispatch<ActionType>) => {
    todoListApi.updateTodoList(newTitle, id)
        .then(res => {
            dispatch(changeTitleTodolistAC(newTitle, id))
        })
}

//types
export type FilterType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
