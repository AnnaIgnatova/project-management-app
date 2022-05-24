import { createSlice } from '@reduxjs/toolkit';

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
