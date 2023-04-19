import type {Meta, StoryObj} from '@storybook/react';
import {EditableSpan} from '../EditableSpan';

const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: { // описываем пропсы которые заданы не явно (со знаком?)
        onChange: {
            description: 'Button inside form clicked',
            action: 'EditableSpan value changed'
        }
    }
};
export default meta;

type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanExample: Story = {
    args: {
        value: 'This is SPAN'
    },
};


