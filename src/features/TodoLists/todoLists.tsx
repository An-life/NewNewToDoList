import {Grid, Paper} from "@mui/material";
import {AddItemForTodoList} from "../../Components/AddItemForm/AddItemForTodoList";
import {ToDoList} from "./ToDoList";
import {useCallback, useEffect} from "react";
import {
    addTodoListsTC,
    changeFilterTodolistAC, changeTodoListTitleTC, fetchTodoListsTC,
    FilterType,
    removeTodoListsTC,
    TodoListDomainType
} from "../../state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../state/Store";

export let ToDoLists = (props: PropsType) => {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootType, Array<TodoListDomainType>>(state => state.todolists);

    useEffect(()=>{
        if(props.demo){
            return
        }
        dispatch(fetchTodoListsTC())
    },[])


    //дабавление тудулиста
    let addTodoList = useCallback((title: string) => {
        dispatch(addTodoListsTC(title));
    }, [dispatch])
    //фильтрация тасок
    let changeFilter = useCallback((value: FilterType, todoListId: string) => {
        let action = changeFilterTodolistAC(value, todoListId);
        dispatch(action);
    }, [dispatch])
    //удаление тудулиста
    let removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListsTC(todoListId));
    }, [dispatch])
    //изменение название тудулиста
    let changeTodoListTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodoListTitleTC(title, id));
    }, [dispatch])


    return (<div>
            <Grid container style={{padding: '20px'}}>
                <AddItemForTodoList addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map(tl => {
                    return <Grid item>
                        <Paper style={{padding: '10px'}}>
                            <ToDoList
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                changeFilter={changeFilter}
                                filter={tl.filter}
                                removeTodoList={removeTodoList}
                                changeTodoListTitle={changeTodoListTitle}
                                demo={props.demo}
                                entityStatus={tl.entityStatus}
                            /></Paper>
                    </Grid>
                })}
            </Grid>
        </div>
    )
}

//types
type PropsType = {
    demo?: boolean
}