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
  updateTaskIndicator: '',
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
    updateTaskIndicator: (state, action) => {
      state.updateTaskIndicator = action.payload;
    },
    clearTask: (state) => {
      state.task = initialState.task;
    },
  },
});

export const { getTask, updateTaskIndicator, clearTask } = taskSlice.actions;
export default taskSlice.reducer;
