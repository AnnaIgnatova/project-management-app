import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import userReducer from '../features/user/userSlice';
import tokenReduser from '../features/token/tokenSlice';
import taskReduser from '../features/task/taskSlice';

const rootReducer = combineReducers({ userReducer, taskReduser, tokenReduser });

export const store = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
