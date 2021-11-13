import React from 'react';
import { ComponentStory, ComponentMeta} from '@storybook/react';
import AppRedux from './AppRedux';
import {ReduxStoreDecorator} from './stories/Decorators/ReduxStoreDecorator';


export default {
    title:'Todolist/AppRedux',
    component:AppRedux,
    decorators:[ReduxStoreDecorator]
} as ComponentMeta<typeof AppRedux>;

export const AppWithReduxExample:ComponentStory<typeof AppRedux>=()=>{
    return <AppRedux />};

