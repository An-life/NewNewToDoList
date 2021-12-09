import {
    AddTodolistType,
    ChangeFilterTodolistType,
    ChangeTitleTodolistType,
    RemoveTodolistType,
    SetTodoListActionType
} from './todolistreducer';
import {TaskStatuses, TaskType, todoListApi, UpdateTaskType} from '../API/todoList-api';
import {TasksStateType} from '../AppRedux';
import {Dispatch} from 'redux';
import {AppRootType} from './Store';

type  AddTaskType = {
    type: 'ADD-TASK'
    task: TaskType
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
type  UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    model:UpdateTaskType
    taskId: string
    todolistId: string
}
type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}
export type ActionType = AddTaskType | RemoveTaskType | ChangeTaskTitleType | UpdateTaskActionType | AddTodolistType |
    RemoveTodolistType | ChangeTitleTodolistType | ChangeFilterTodolistType | SetTodoListActionType | SetTasksActionType

let initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':

        return {

            ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
        }
        /*let stateCopy = {...state};
            let newTask = action.task
            let tasks = stateCopy[newTask.todoListId];
            let newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy*/
        case 'REMOVE-TASK': {
            let stateCopy = {...state};
            let tasks = stateCopy[action.todolistId];
            let filterTask = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filterTask;
            return stateCopy
        }
        case 'UPDATE-TASK': {
            let stateCopy = {...state};
            let tasks = stateCopy[action.todolistId]
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            return stateCopy
        }
        // {
        //         ...state, [action.todolistId]: state[action.todolistId]
        //             .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
        //     }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todoList.id]:[]
            }
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
        case 'SET-TASKS': {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state;
    }
}

export const addTaskAC = (task: TaskType): AddTaskType => {

    return {type: 'ADD-TASK', task}
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

export const updateTaskAC = (taskId:string, model:UpdateTaskType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK',  model, todolistId,taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', todolistId: todolistId, tasks: tasks}
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todoListApi.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todoListApi.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}
export const addTaskTC = (title:string,todolistId: string) => {
    return (dispatch: Dispatch) => {
        todoListApi.createTask(title ,todolistId)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}
export const changeTaskTC = (taskId: string, domainModel:UpdateTaskType,todolistId:string) => {
    return (dispatch: Dispatch,getState:()=>AppRootType) => {
        const state=getState();
        const task=state.tasks[todolistId].find(t=>t.id===taskId);
        if(!task){
            throw new Error ('task is not in the state');
            console.warn('task is not in the state')
            return;
        }
        const apiModel:UpdateTaskType={
            title:task.title,
            description:task.description,
            completed:(task.status===TaskStatuses.New?false:true),
            status:task.status,
            priority:task.priority,
            startDate:task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todoListApi.updateTask(todolistId,taskId,apiModel)
            .then(res => {
                dispatch(updateTaskAC(taskId,domainModel,todolistId))
            })
    }
}