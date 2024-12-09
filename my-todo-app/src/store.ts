import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import taskReducer from './features/tasksSlice';
import userReducer from './features/usersSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
    tasks: taskReducer,
    users: userReducer
});

export function createStore() {
    const store = configureStore({
        reducer: rootReducer,
        //devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), //.concat(loggerMiddleware),
    });

    setupListeners(store.dispatch);

    return store;
}

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
