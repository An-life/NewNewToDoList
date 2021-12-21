import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForTodoList} from './AddItemForTodoList';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TodoList/AddItemForTodoList',
    component: AddItemForTodoList,
} as ComponentMeta<typeof AddItemForTodoList>;

const callback = action(`Button 'add' was pressed inside the form`);

export const AddItemFormBaseExample: ComponentStory<typeof AddItemForTodoList> = () => {
    return <AddItemForTodoList addItem={callback}/>
};

export const AddItemFormDisabledExample: ComponentStory<typeof AddItemForTodoList> = () => {
    return <AddItemForTodoList disabled={true} addItem={callback}/>
};









