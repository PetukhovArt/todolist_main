import type {Meta, StoryObj} from '@storybook/react';
import {EditableSpan} from '../EditableSpan';
import AppWithRedux from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';

const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    tags: ['autodocs'],
    argTypes: { // описываем пропсы которые заданы не явно (со знаком?)
        // onChange: {
        //     description: 'Button inside form clicked',
        //     action: 'EditableSpan value changed'
        // }
    }
};
export default meta;

type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {
    args: {

    },
};


