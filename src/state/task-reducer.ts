import {v1} from 'uuid';
import {
    AddTodolistType,
    ChangeFilterTodolistType,
    ChangeTitleTodolistType,
    RemoveTodolistType, setTodoListAC, SetTodoListActionType
} from './todolistreducer';
import {TaskStatuses, TaskType, todoListApi, TodoTaskPriorities} from '../API/todoList-api';
import {TasksStateType} from '../AppRedux';
import {Dispatch} from 'redux';

type  AddTaskType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type RemoveTaskType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    taskId: string
    todolistId: string
}
type  ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    status: TaskStatuses
    taskId: string
    todolistId: string
}
type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}
export type ActionType = AddTaskType | RemoveTaskType | ChangeTaskTitleType | ChangeTaskStatusType | AddTodolistType |
    RemoveTodolistType | ChangeTitleTodolistType | ChangeFilterTodolistType | SetTodoListActionType | SetTasksActionType

let initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            let stateCopy = {...state};
            let newTask = {
                id: v1(), title: action.title, status: TaskStatuses.New, description: '',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: action.todolistId,
                order: 0,
                addedDate: ''
            };
            let tasks = stateCopy[action.todolistId];
            let newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy
        }
        case 'REMOVE-TASK': {
            let stateCopy = {...state};
            let tasks = stateCopy[action.todolistId];
            let filterTask = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filterTask;
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            let stateCopy = {...state};
            let task = stateCopy[action.todolistId].find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            let stateCopy = {...state};
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            let stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'SET-TODOLIST': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':{
            const copyState = {...state}
            copyState[action.todolistId]=action.tasks
            return copyState
        }
        default:
            return state;
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const changeTaskTitletAC = (title: string, taskId: string, todolistId: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', title, taskId, todolistId}
}
export const changeTaskStatusAC = (status: TaskStatuses, taskId: string, todolistId: string): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', status, taskId, todolistId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS',todolistId:todolistId,tasks:tasks}
}

export const fetchTasksTC=(todolistId:string)=>{
    return (dispatch:Dispatch)=>{
        todoListApi.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items,todolistId))
            })
    }
}