import {TaskType, TodoType} from '../App';
import {v1} from 'uuid';

type ActionType = AddTodolistType|RemoveTodolistType
type  AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
}
type RemoveTodolistType={
    type: 'REMOVE-TODOLIST'
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
