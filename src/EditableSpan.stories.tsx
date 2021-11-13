import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';



export default {
    title: 'TodoList/EditableSpan',
    component:EditableSpan ,
} as ComponentMeta<typeof EditableSpan>;

const changeCallback = action(`Value changed`);


const Template: ComponentStory<typeof EditableSpan> = () => {

    return <EditableSpan title={'Hello'}
                         onChange={changeCallback}/>
}

export const EditableSpanBaseExample = Template.bind({});


