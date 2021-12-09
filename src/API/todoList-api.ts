import axios from 'axios';

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
type ResponseType<D = {}> = {
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
type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            'API-KEY': '5aecab3c-05b6-41db-afbc-a453341bf70f'
        }
    }
)
export const todoListApi = {
    getTodolist() {
        const promise = instance.get<Array<TodoListType>>('todo-lists')
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', {title: title})
        return promise;
    },
    deleteTodoList(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`)
        return promise;
    },
    updateTodoList(id: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
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
        const promise = instance.put<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
        return promise;
    },
    createTask(todoListId:string, taskTitle:string){
        const promise = instance.post<ResponseType<TaskType>>(`todo-lists/${todoListId}/tasks`,{title:taskTitle})
        return promise;
    }

}