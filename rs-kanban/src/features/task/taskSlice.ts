import { getTaskById } from './../../api/tasks';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DeleteTaskProps } from '../interfaces/board';

const initialState = {
  task: {
    id: '',
    title: '',
    order: 1,
    description: '',
    userId: '',
    boardId: '',
    columnId: '',
    files: [],
  },
};

export const getTaskData = createAsyncThunk(
  'task/getTaskData',
  async (payload: DeleteTaskProps, { dispatch, rejectWithValue }) => {
    try {
      const { boardId, columnId, taskId } = payload;
      const task = await getTaskById(boardId, columnId, taskId);
      dispatch(getTask(task));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTask: (state, action) => {
      state.task = { ...action.payload };
    },
  },
});

export const { getTask } = taskSlice.actions;
export default taskSlice.reducer;
