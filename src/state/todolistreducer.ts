import {FilterType, TaskType, TodoType} from '../App';
import {v1} from 'uuid';

type ActionType = AddTodolistType|RemoveTodolistType|ChangeTitleTodolistType|ChangeFilterTodolistType
type  AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
}
type RemoveTodolistType={
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
        {let todoList: TodoType = {id: v1(), title: action.title, filter: 'all'};
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
export const AddTodolistAC= (title: string): AddTodolistType => {
    return {type: 'ADD-TODOLIST' as const, title: title}
}
export const RemoveTodolistAC= (id: string): RemoveTodolistType => {
    return {type: 'REMOVE-TODOLIST' as const, id:id}
}
export const ChangeTitleTodolistAC=(newTitle:string,id:string):ChangeTitleTodolistType=>{
    return {type: 'CHANGE-TODOLIST-TITLE' as const,title:newTitle, id:id}
}
export const ChangeFilterTodolistAC=(filter:FilterType,id:string):ChangeFilterTodolistType=>{
    return {type: 'CHANGE-TODOLIST-FILTER' as const,filter:filter, id:id}
}