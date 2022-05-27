import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import userReducer from '../features/user/userSlice';
import boardsReducer from '../features/boards/boardsSlice';
import boardReducer from '../features/board/boardSlice';
import tokenReducer from '../features/token/tokenSlice';
import taskReducer from '../features/task/taskSlice';

const rootReducer = combineReducers({
  userReducer,
  taskReducer,
  tokenReducer,
  boardsReducer,
  boardReducer,
});

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
