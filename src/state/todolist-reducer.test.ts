import {v1} from 'uuid';
import {TodoType} from '../App';
import {AddTodolistAC, RemoveTodolistAC, todolistReducer} from './todolistreducer';

test('new todolist should be add',()=>{
     let todolistId1=v1();
     let todolistId2=v1();
     let newTitle='New todo'
     const startState:Array<TodoType>=[
         {id:todolistId1,title:'What to learn',filter:'all'},
         {id:todolistId2,title:'What to buy',filter:'all'}
     ]
     const endState=todolistReducer(startState,AddTodolistAC(newTitle))
     expect(endState.length).toBe(3);
     expect(endState[2].title).toBe(newTitle);
     expect(endState[2].filter).toBe('all')
 })
test(' todolist should be removed',()=>{
    let todolistId1=v1();
    let todolistId2=v1();

    const startState:Array<TodoType>=[
        {id:todolistId1,title:'What to learn',filter:'all'},
        {id:todolistId2,title:'What to buy',filter:'all'}
    ]
    const endState=todolistReducer(startState,RemoveTodolistAC(todolistId2))
    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe('What to learn');
})