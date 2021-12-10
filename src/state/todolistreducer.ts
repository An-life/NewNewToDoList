import {ActionType} from './task-reducer';
import {todoListApi, TodoListType} from '../API/todoList-api';
import {Dispatch} from 'redux';

let initialState: Array<TodoListDomainType> = []

export const todolistReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: 'all'}, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id);
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLIST':
            return action.todoLists.map(tl => ({...tl, filter: 'all'}));
        default:
            return state;
    }
}

//actionCreators
export const addTodolistAC = (todoList: TodoListType) =>
    ({type: 'ADD-TODOLIST', todoList}) as const
export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', id}) as const
export const changeTitleTodolistAC = (title: string, id: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', title, id}) as const
export const changeFilterTodolistAC = (filter: FilterType, id: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', filter, id}) as const
export const setTodoListAC = (todoLists: Array<TodoListType>) =>
    ({type: 'SET-TODOLIST', todoLists}) as const

//thunkCreators
export const fetchTodoListsTC = () => (dispatch: Dispatch<ActionType>) => {
    todoListApi.getTodolist()
        .then(res => {
            dispatch(setTodoListAC(res.data))
        })
}
export const removeTodoListsTC = (todoListId: string) => (dispatch: Dispatch<ActionType>) => {
    todoListApi.deleteTodoList(todoListId)
        .then(res => {
            dispatch(removeTodolistAC(todoListId))
        })
}
export const addTodoListsTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todoListApi.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
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
}
