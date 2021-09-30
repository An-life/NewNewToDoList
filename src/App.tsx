import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {ToDoList} from './ToDoList';

export type FilterType = 'all' | 'active' | 'completed'


function App() {
//state
    let [tasks, setTasks] = useState([
        {id:v1() , title: 'HTML', isDone: true},
        {id:v1() , title: 'CSS', isDone: false},
        {id:v1() , title: 'React', isDone: false}
    ])
//удаление таски
    function removeTask(id: string) {
        tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks)
    }
//добавление таски
    function addTask(title:string) {
        let task={id:v1(),title:title,isDone:false}
         let newTask=[task,...tasks];
        setTasks(newTask);
    }
//фильтрация тасок
    let [filter, setFilter] = useState<FilterType>('all');
    let tasksForToDoList = tasks;
    if (filter === 'active') {
        tasksForToDoList = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterType) {
        setFilter(value);
    }
//изменение статуса таски
    function changeTaskStatus(id:string,isDone:boolean) {
        let task=tasks.filter(t=>t.id===id);
        if (task){
            console.log(task)
             task[0].isDone=isDone;
            setTasks([...tasks]);
        }
    }

    console.log(v1())
    return (
        <div className="App">
            <ToDoList title="What to learn" tasks={tasksForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      filter={filter}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>)
}

export default App;
