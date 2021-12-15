import {taskReducer} from './task-reducer';
import {addTodolistAC, TodoListDomainType, todolistReducer} from './todolist-reducer';
import {TasksStateType} from '../App/AppRedux';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];
    const action = addTodolistAC({
        id: '3', title: 'What to learn', addedDate: '',
        order: 0
    });
    const endTasksState = taskReducer(startTasksState, action)
    const endTodoListsState = todolistReducer(startTodoListsState, action)
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoList.id);
    expect(idFromTodoLists).toBe(action.todoList.id);
});