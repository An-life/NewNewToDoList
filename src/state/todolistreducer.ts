import {FilterType, TaskType, TodoType} from '../App';
import {v1} from 'uuid';

type ActionType = AddTodolistType|RemoveTodolistType|ChangeTitleTodolistType|ChangeFilterTodolistType
export type  AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId:string
}
 export type RemoveTodolistType={
    type: 'REMOVE-TODOLIST'
    id: string
}
type ChangeTitleTodolistType={
    type: 'CHANGE-TODOLIST-TITLE'
    title:string
    id: string
}
type  ChangeFilterTodolistType={
    type: 'CHANGE-TODOLIST-FILTER'
    filter:FilterType
    id: string
}
export const todolistReducer=(state: Array<TodoType>, action: ActionType): Array<TodoType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':
        {let todoList: TodoType = {id: action.todolistId, title: action.title, filter: 'all'};
            return [...state, todoList]}
        case 'REMOVE-TODOLIST':{
            let rightTodoLists = state.filter(t => t.id != action.id)
           return rightTodoLists;
        }
        case 'CHANGE-TODOLIST-TITLE':{
            const todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.title = action.title
            } return [...state];
        }
        case 'CHANGE-TODOLIST-FILTER':{
            const todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            } return [...state];
        }
        default:
            return state;
    }
}
export const addTodolistAC= (title: string): AddTodolistType => {
    return {type: 'ADD-TODOLIST' as const, title: title,todolistId:v1()}
}
export const removeTodolistAC= (id: string): RemoveTodolistType => {
    return {type: 'REMOVE-TODOLIST' as const, id:id}
}
export const changeTitleTodolistAC=(newTitle:string,id:string):ChangeTitleTodolistType=>{
    return {type: 'CHANGE-TODOLIST-TITLE' as const,title:newTitle, id:id}
}
export const changeFilterTodolistAC=(filter:FilterType,id:string):ChangeFilterTodolistType=>{
    return {type: 'CHANGE-TODOLIST-FILTER' as const,filter:filter, id:id}
}