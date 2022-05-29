import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allTask: [],
};

export const searchSlice = createSlice({
  name: 'searchTasks',
  initialState,
  reducers: {
    getAllTasks: (state, action) => {
      state.allTask = { ...action.payload };
    },
  },
});

export const { getAllTasks } = searchSlice.actions;
export default searchSlice.reducer;
