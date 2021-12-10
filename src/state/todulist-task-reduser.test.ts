import {taskReducer} from './task-reducer';
import {addTodolistAC, TodoListDomainType, todolistReducer} from './todolistreducer';
import {TasksStateType} from '../App/AppRedux';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];
    const action = addTodolistAC('new todolist');
    const endTasksState = taskReducer(startTasksState, action)
    const endTodoListsState = todolistReducer(startTodoListsState, action)
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodoLists).toBe(action.todolistId);
});