import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    setTodoListAC,
} from './todolistreducer';
import {TaskStatuses, TaskType, todoListApi, UpdateTaskType} from '../API/todoList-api';
import {TasksStateType} from '../App/AppRedux';
import {Dispatch} from 'redux';
import {AppRootType} from './Store';

let initialState: TasksStateType = {}

export const taskReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        /*let stateCopy = {...state};
            let newTask = action.task
            let tasks = stateCopy[newTask.todoListId];
            let newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy*/
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
        /*{
            let stateCopy = {...state};
            let tasks = stateCopy[action.todolistId];
            let filterTask = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filterTask;
            return stateCopy
        }*/
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        /*{
        let stateCopy = {...state};
        let tasks = stateCopy[action.todolistId]
        stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
        return stateCopy
    }*/
        case 'ADD-TODOLIST':
            return {...state, [action.todoList.id]: []};
        case 'REMOVE-TODOLIST':
            let stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        case 'SET-TODOLIST': {
            const copyState = {...state}
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}

//actionCreators
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task}) as const
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', todolistId, taskId}) as const
export const updateTaskAC = (taskId: string, model: UpdateTaskType, todolistId: string) =>
    ({
        type: 'UPDATE-TASK', model,
        todolistId, taskId
    }) as const
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', todolistId, tasks}) as const

//thunkCreators
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todoListApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    todoListApi.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todoListApi.createTask(title, todolistId)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const changeTaskTC = (taskId: string, domainModel: UpdateTaskType, todolistId: string) =>
    (dispatch: Dispatch<ActionType>, getState: () => AppRootType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);
        if (!task) {
            throw new Error('task is not in the state');
            console.warn('task is not in the state')
            return;
        }
        const apiModel: UpdateTaskType = {
            title: task.title,
            description: task.description,
            completed: (task.status === TaskStatuses.New ? false : true),
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todoListApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
    }

//types
export type ActionType = ReturnType<typeof addTaskAC> | ReturnType<typeof removeTaskAC> |
    ReturnType<typeof updateTaskAC> | ReturnType<typeof addTodolistAC> |
    ReturnType<typeof removeTodolistAC> | ReturnType<typeof changeTitleTodolistAC> |
    ReturnType<typeof changeFilterTodolistAC> | ReturnType<typeof setTodoListAC> | ReturnType<typeof setTasksAC>