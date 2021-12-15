 import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            'API-KEY': '5aecab3c-05b6-41db-afbc-a453341bf70f'
        }
    }
)

//api
export const todoListApi = {
    getTodolist() {
        const promise = instance.get<Array<TodoListType>>('todo-lists')
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<{title: string}, ResponseType<{ data: {item: TodoListType } }>>('todo-lists', {title: title})
        return promise;
    },
    deleteTodoList(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`)
        return promise;
    },
    updateTodoList(id: string, title: string) {
        const promise = instance.put<{title: string}, AxiosResponse<ResponseType>>(`todo-lists/${id}`, {title: title})
        return promise;
    },
    getTasks(todoListId: string) {
        const promise = instance.get<GetTaskResponseType>(`todo-lists/${todoListId}/tasks`)
        return promise;
    },
    deleteTask(todoListId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
        return promise;
    },
    updateTask(todoListId:string,taskId: string,model:UpdateTaskType){
        const promise = instance.put<UpdateTaskType, AxiosResponse<ResponseType>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
        return promise;
    },
    // createTask(title: string, todolistId: string) {
    //     return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title})
    // },
    createTask(title:string, todoListId:string ){
        const promise = instance.post<{title:string},AxiosResponse<ResponseType<{item:TaskType}>>>(`todo-lists/${todoListId}/tasks`,{title})
        return promise;
    }
}

//types
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export enum TaskStatuses{
    New=0,
    InProgress=1,
    Completed=2,
    Draft=3
}
export enum TodoTaskPriorities{
    Low=0,
    Middle=1,
    Hi=2,
    Urgently=3,
    Later=4
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UpdateTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
}
