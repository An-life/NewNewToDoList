import {TaskType, TodoType} from '../App';
import {v1} from 'uuid';

type ActionType = AddTodolistType
type  AddTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
}
export const todolistReducer=(state: Array<TodoType>, action: ActionType): Array<TodoType> => {
    switch (action.type) {
        case 'ADD-TODOLIST':
        {let todoList: TodoType = {id: v1(), title: action.title, filter: 'all'};
            return [...state, todoList]}
        default:
            return state;
    }
}
export const AddTodolistAC= (title: string): AddTodolistType => {
    return {type: 'ADD-TODOLIST' as const, title: title}
}
