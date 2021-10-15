import {ChangeEvent, useState} from 'react';

type EditableSpanType={
    title:string
    onChange:(newValue:string)=>void
}
export let EditableSpan=(props:EditableSpanType)=>{
    let [editMode,setEditMode]=useState(false);
    let [title,setTitle]=useState('');
    let activateEditMode=()=>{setEditMode(true);
        setTitle(props.title)}
    let activateViewMode=()=>{setEditMode(false);
        props.onChange(title);}
    let onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>setTitle(e.currentTarget.value)


    return editMode?<input value={title} onChange={onChangeHandler} onBlur={activateViewMode} autoFocus />:
    <span onDoubleClick={activateEditMode}>{props.title}</span>

}