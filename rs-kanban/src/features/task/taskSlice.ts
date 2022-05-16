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
};

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
