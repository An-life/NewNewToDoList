import {FilterType, TasksType, TaskType, TodoType} from '../App';
import {v1} from 'uuid';
import {AddTodolistType, RemoveTodolistType} from './todolistreducer';

type ActionType =AddTaskType|RemoveTaskType| ChangeTaskTitleType|ChangeTaskStatusType| AddTodolistType|RemoveTodolistType
type  AddTaskType = {
    type: 'ADD-TASK'
    title: string
    todolistId:string
}
type RemoveTaskType={
    type: 'REMOVE-TASK'
    taskId: string
    todolistId:string

}
type ChangeTaskTitleType={
    type: 'CHANGE-TASK-TITLE'
    title:string
    taskId: string
    todolistId:string}

type  ChangeTaskStatusType={
    type: 'CHANGE-TASK-STATUS'
    isDone:boolean
    taskId: string
    todolistId:string
}
export const taskReducer=(state:TasksType , action: ActionType): TasksType => {
    switch (action.type) {
        case 'ADD-TASK':{
            let stateCopy={...state};
            let newTask={id: v1(), title:action.title, isDone: false};
            let tasks = stateCopy[action.todolistId];
            let newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy}
        case 'REMOVE-TASK':{
            let stateCopy={...state};
            let tasks = stateCopy[action.todolistId];
            let filterTask=tasks.filter(t=>t.id!=action.taskId)
            stateCopy[action.todolistId] =filterTask ;
            return stateCopy}
        case 'CHANGE-TASK-TITLE':{
            let stateCopy={...state};
            let task=stateCopy[action.todolistId].find(t=>t.id===action.taskId)
            if(task){
                task.title=action.title
            }return stateCopy
        }
        case 'CHANGE-TASK-STATUS':{
            let stateCopy={...state};
            let task=stateCopy[action.todolistId].find(t=>t.id===action.taskId)
            if(task){
                task.isDone=action.isDone
            }return stateCopy
        }
        case 'ADD-TODOLIST':{
            let stateCopy={...state};
            stateCopy[action.todolistId]=[];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST':{
            let stateCopy={...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            return state;
    }
}
export const addTaskAC= (title: string,todolistId:string): AddTaskType => {
    return {type: 'ADD-TASK' as const, title,todolistId}
}
export const removeTaskAC= (taskId: string,todolistId:string ): RemoveTaskType => {
    return {type: 'REMOVE-TASK' as const,todolistId,taskId}
}
export const changeTaskTitletAC=(title:string,taskId: string, todolistId:string):ChangeTaskTitleType=>{
    return {type: 'CHANGE-TASK-TITLE' as const,title,taskId,todolistId }
}
export const changeTaskStatusAC=(isDone:boolean,taskId: string,todolistId:string):ChangeTaskStatusType=>{
    return {type: 'CHANGE-TASK-STATUS' as const,isDone,taskId,todolistId}
}