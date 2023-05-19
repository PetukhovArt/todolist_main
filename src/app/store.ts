import {TasksActionsType, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {TodolistActionsType, todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {AppActionsType, appReducer} from './app-reducer';
import {AuthActionsType, authReducer} from '../features/Login/auth-reducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch=()=> useDispatch<AppDispatchType>()

// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootActionsType = TodolistActionsType | AppActionsType | TasksActionsType | AuthActionsType

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
