import {v1} from 'uuid';
import {FilterType, TodoType} from '../App';
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistReducer
} from './todolistreducer';

test('new todolist should be add',()=>{
     let todolistId1=v1();
     let todolistId2=v1();
     let newTitle='New todo'
     const startState:Array<TodoType>=[
         {id:todolistId1,title:'What to learn',filter:'all'},
         {id:todolistId2,title:'What to buy',filter:'all'}
     ]
     const endState=todolistReducer(startState,addTodolistAC(newTitle))
     expect(endState.length).toBe(3);
     expect(endState[0].title).toBe(newTitle);
     expect(endState[0].filter).toBe('all')
 })
test(' todolist should be removed',()=>{
    let todolistId1=v1();
    let todolistId2=v1();

    const startState:Array<TodoType>=[
        {id:todolistId1,title:'What to learn',filter:'all'},
        {id:todolistId2,title:'What to buy',filter:'all'}
    ]
    const endState=todolistReducer(startState,removeTodolistAC(todolistId2))
    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe('What to learn');
})
test(' todolist should have new title',()=>{
    let todolistId1=v1();
    let todolistId2=v1();

    const startState:Array<TodoType>=[
        {id:todolistId1,title:'What to learn',filter:'all'},
        {id:todolistId2,title:'What to buy',filter:'all'}
    ]
    let newTitle="What to do"
    const endState=todolistReducer(startState,changeTitleTodolistAC(newTitle,todolistId1))
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(newTitle);
})
test(' todolist should have new filter',()=>{
    let todolistId1=v1();
    let todolistId2=v1();

    const startState:Array<TodoType>=[
        {id:todolistId1,title:'What to learn',filter:'all'},
        {id:todolistId2,title:'What to buy',filter:'all'}
    ]
    let newFilter:FilterType="completed"
    const endState=todolistReducer(startState,changeFilterTodolistAC(newFilter,todolistId1))
    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe(newFilter);
})