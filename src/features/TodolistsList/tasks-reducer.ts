import {
    addTodolistAC, clearTodosDataAC,
    removeTodolistAC,
    setTodolistsAC,
} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, TodolistType, UpdateTaskModelType} from '../../api/todolists-api'
import {Dispatch} from 'redux';
import {AppRootStateType, RootActionsType} from '../../app/store';
import {RequestStatusType, setErrorAC, setRequestStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


//Action Creators =============================
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}) as const
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task}) as const
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) =>
    ({type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}) as const
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}) as const
export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId}) as const

export const changeTaskEntityStatusAC = (taskId: string, todolistId: string, entityStatus: RequestStatusType) => {
    return ({type: 'SET-TASK/ENTITY-STATUS', taskId, todolistId, entityStatus}) as const
}


//THUNK =============================
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<RootActionsType>) => {
    dispatch(setRequestStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            if (res.data.error === null) {
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch(setRequestStatusAC('succeeded'))
            } else {
                dispatch(setErrorAC(res.data.error))
                dispatch(setRequestStatusAC('failed'))
            }
        })
        .catch(e => handleServerNetworkError(e, dispatch))
}
export const removeTaskTC = (id: string, todolistId: string) => (dispatch: Dispatch<RootActionsType>) => {
    dispatch(changeTaskEntityStatusAC(id, todolistId, 'loading'))
    dispatch(setRequestStatusAC('loading'))
    todolistsAPI.deleteTask(id, todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(id, todolistId))
                dispatch(setRequestStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => handleServerNetworkError(e, dispatch))
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<RootActionsType>) => {
    dispatch(setRequestStatusAC('loading'))
    todolistsAPI.createTask(title, todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item));
                dispatch(setRequestStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        })
}
export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) =>
    (dispatch: Dispatch<RootActionsType>, getState: () => AppRootStateType) => {
        dispatch(setRequestStatusAC('loading'))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }
            todolistsAPI.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskStatusAC(taskId, status, todolistId))
                        dispatch(setRequestStatusAC('succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch(e => {
                    handleServerNetworkError(e, dispatch)
                })
        }
    }
export const updateTaskTitleTC = (taskId: string, newTitle: string, todolistId: string) => {
    return (dispatch: Dispatch<RootActionsType>, getState: () => AppRootStateType) => {
        dispatch(setRequestStatusAC('loading'))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: newTitle,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            }
            todolistsAPI.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
                        dispatch(setRequestStatusAC('succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch(e => {
                    handleServerNetworkError(e, dispatch)
                })
        }
    }
}

//REDUCER  =============================
export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}

        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, taskEntityStatus: 'idle'}, ...state[action.task.todoListId]]
            }

        case 'CHANGE-TASK-STATUS':
            return ({
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            })

        case 'CHANGE-TASK-TITLE':
            return ({
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            })
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}

        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState

        case 'SET-TODOS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => stateCopy[tl.id] = [])
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks.map(t => ({...t, taskEntityStatus: 'idle'}))}

        case 'SET-TASK/ENTITY-STATUS':
            return ({
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, taskEntityStatus: action.entityStatus} : t)
            })
        case 'CLEAR-TODOS-DATA':
            return {}
        default:
            return state;
    }
}


//TYPES =============================
const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export type TasksActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTaskEntityStatusAC>
    | ReturnType<typeof clearTodosDataAC>

export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}
export type TaskDomainType = TaskType & { taskEntityStatus: RequestStatusType }


