import type {Meta, StoryObj} from '@storybook/react';
import {Task} from '../Todolist';

const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    tags: ['autodocs'],
    argTypes: { // описываем пропсы которые заданы не явно (со знаком?)
        changeTaskStatus: {
            description: 'Status changed inside Task',
            action: 'status changed'
        },
        changeTaskTitle: {
            description: 'Title changed inside Task',
            action: 'title changed'
        },
        removeTask: {
            description: 'Remove button inside Task',
            action: 'remove task button clicked'
        }
    }
};
export default meta;

type Story = StoryObj<typeof Task>;

export const TaskIsDone: Story = {
    args: {
        task: {id: '1', isDone: true, title: 'JS'},
        todolistId: 'todolistId1'
    },
};
export const TaskNotIsDone: Story = {
    args: {
        task: {id: '1', isDone: false, title: 'JS'},
        todolistId: 'todolistId1'
    },
};

