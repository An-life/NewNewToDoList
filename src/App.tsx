import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {ToDoList} from './ToDoList';

export type FilterType = 'all' | 'active' | 'completed'
type TodoType = {
    id: string
    title: string
    filter: FilterType
}


function App() {
//state
    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'React', isDone: false}
    ])

//удаление таски
    function removeTask(id: string) {
        tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks)
    }

//добавление таски
    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTask = [task, ...tasks];
        setTasks(newTask);
    }

//фильтрация тасок
    function changeFilter(value: FilterType, todoListId: string) {
        let todoList = todoLists.find(t => t.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }


//изменение статуса таски
    function changeTaskStatus(id: string, isDone: boolean) {
        let task = tasks.filter(t => t.id === id);
        if (task) {
            task[0].isDone = isDone;
            setTasks([...tasks]);
        }
    }

    let [todoLists, setTodoLists] = useState<Array<TodoType>>(
        [{id: v1(), title: 'What to bye', filter: 'all'},
            {id: v1(), title: 'What to read', filter: 'completed'}])


    return (
        <div className="App">
            {todoLists.map(tl => {
                let tasksForToDoList = tasks;
                if (tl.filter === 'active') {
                    tasksForToDoList = tasks.filter(t => t.isDone === false);
                }
                if (tl.filter === 'completed') {
                    tasksForToDoList = tasks.filter(t => t.isDone === true);
                }

                return <ToDoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForToDoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    filter={tl.filter}
                    changeTaskStatus={changeTaskStatus}
                />
            })}

        </div>)
}

export default App;
