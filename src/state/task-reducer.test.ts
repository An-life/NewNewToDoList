import {addTaskAC, changeTaskStatusAC, changeTaskTitletAC, removeTaskAC, taskReducer} from './task-reducer';
import {addTodolistAC, removeTodolistAC} from './todolistreducer';
import {TaskStatuses, TodoTaskPriorities} from '../API/todoList-api';
import {AppRootType} from '../stories/Decorators/ReduxStoreDecorator';
import {TasksStateType} from '../AppRedux';

test('correct task should be added to correct array', () => {
    const startState:any  = {
        "todolistId1": [
            { id: "1", title: "CSS", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: '' },
            { id: "2", title: "JS", status:TaskStatuses.Completed,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: ''  },
            { id: "3", title: "React", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: '' },
            { id: "2", title: "milk", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: ''},
            { id: "3", title: "tea",  status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: '' }
        ]
    };

    const action = addTaskAC("juce", "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})
test('correct task should be deleted from correct array', () => {
    const startState:TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: '' },
            { id: "2", title: "JS", status:TaskStatuses.Completed,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: ''  },
            { id: "3", title: "React", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: '' },
            { id: "2", title: "milk", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: ''},
            { id: "3", title: "tea",  status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: '' }
        ]
    };

    const action = removeTaskAC("2", "todolistId2");
    const endState = taskReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t=>t.id!='2')).toBeTruthy();

});
test('status of specified task should be changed', () => {
    const startState:TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: '' },
            { id: "2", title: "JS", status:TaskStatuses.Completed,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: ''  },
            { id: "3", title: "React", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: '' },
            { id: "2", title: "milk", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: ''},
            { id: "3", title: "tea",  status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: '' }
        ]
    };

    const action = changeTaskStatusAC(TaskStatuses.New, "2", "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBeFalsy();
    expect(endState['todolistId1'][1].status).toBeTruthy();

});

test('title of specified task should be changed', () => {
    const startState:TasksStateType  = {
        "todolistId1": [
            { id: "1", title: "CSS", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: '' },
            { id: "2", title: "JS", status:TaskStatuses.Completed,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: ''  },
            { id: "3", title: "React", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: '' },
            { id: "2", title: "milk", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: ''},
            { id: "3", title: "tea",  status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: '' }
        ]
    };
    const action = changeTaskTitletAC("Fuck","2" , "todolistId2");

    const endState = taskReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Fuck');
    expect(endState['todolistId1'][1].title).toBe('JS');

});
test('new array should be added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: '' },
            { id: "2", title: "JS", status:TaskStatuses.Completed,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: ''  },
            { id: "3", title: "React", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: '' },
            { id: "2", title: "milk", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: ''},
            { id: "3", title: "tea",  status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: '' }
        ]
    };

    const action = addTodolistAC("juce");

    const endState = taskReducer(startState, action)

    const keys=Object.keys(endState);
    const newKey=keys.find(k=>k!='todolistId1'&&k!="todolistId2");
    if(!newKey){
        throw Error('new key')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);

})
test('property with todolistId should be deleted', () => {
    const startState:TasksStateType  = {
        "todolistId1": [
            { id: "1", title: "CSS", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: '' },
            { id: "2", title: "JS", status:TaskStatuses.Completed,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: ''  },
            { id: "3", title: "React", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId1',
                order: 0,
                addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: '' },
            { id: "2", title: "milk", status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: ''},
            { id: "3", title: "tea",  status:TaskStatuses.New,description:'',
                completed: false,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId:'todolistId2',
                order: 0,
                addedDate: '' }
        ]
    };

    const action = removeTodolistAC("todolistId2");

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});


