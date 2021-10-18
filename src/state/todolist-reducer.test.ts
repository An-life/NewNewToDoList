import {v1} from 'uuid';
import {TodoType} from '../App';
import {AddTodolistAC, todolistReducer} from './todolistreducer';

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