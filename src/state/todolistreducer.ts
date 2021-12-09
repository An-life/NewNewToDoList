import {ActionType} from './task-reducer';
import {todoListApi, TodoListType} from '../API/todoList-api';
import {Dispatch} from 'redux';

export type FilterType = 'all' | 'active' | 'completed'
export type TodoListDomainType = TodoListType & {
    filter: FilterType
}
export type  AddTodolistType = {
    type: 'ADD-TODOLIST'
    todoList: TodoListType
}
export type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type ChangeTitleTodolistType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type  ChangeFilterTodolistType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterType
    id: string
}
export type SetTodoListActionType = {
    type: 'SET-TODOLIST'
    todolists: Array<TodoListType>
}


let initialState: Array<TodoListDomainType> = []

export const todolistReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodolist: TodoListDomainType = {...action.todoList, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'REMOVE-TODOLIST': {
            let rightTodoLists = state.filter(t => t.id !== action.id)
            return rightTodoLists;
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state];
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state];
        }
        case 'SET-TODOLIST': {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all'
                }
            })
        }
        default:
            return state;
    }
}

export const addTodolistAC = (todoList: TodoListType): AddTodolistType => {
    return {type: 'ADD-TODOLIST', todoList}
}
export const removeTodolistAC = (id: string): RemoveTodolistType => {
    return {type: 'REMOVE-TODOLIST', id: id}
}
export const changeTitleTodolistAC = (newTitle: string, id: string): ChangeTitleTodolistType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: newTitle, id: id}
}
export const changeFilterTodolistAC = (filter: FilterType, id: string): ChangeFilterTodolistType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}
export const setTodoListAC = (todolists: Array<TodoListType>): SetTodoListActionType => {
    return {type: 'SET-TODOLIST', todolists: todolists}
}

export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todoListApi.getTodolist()
            .then(res => {
                dispatch(setTodoListAC(res.data))
            })
    }
}
export const removeTodoListsTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todoListApi.deleteTodoList(todoListId)
            .then(res => {
                dispatch(removeTodolistAC(todoListId))
            })
    }
}
export const addTodoListsTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todoListApi.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const changeTodoListTitleTC = (newTitle: string, id: string) => {
    return (dispatch: Dispatch) => {
        todoListApi.updateTodoList(newTitle, id)
            .then(res => {
                dispatch(changeTitleTodolistAC(newTitle, id))
            })
    }
}
