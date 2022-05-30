import { getAllTaskSearch } from '../../api/search';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  allTask: [],
  sortTask: [],
};

export const getAllTasksForSearch = createAsyncThunk(
  'search/tasks',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const data = await getAllTaskSearch();
      dispatch(getAllTasks(data));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const searchSlice = createSlice({
  name: 'searchTasks',
  initialState,
  reducers: {
    getAllTasks: (state, action) => {
      state.allTask = { ...action.payload };
    },
    sortTask: (state, action) => {
      state.sortTask = { ...action.payload };
    },
  },
});

export const { getAllTasks, sortTask } = searchSlice.actions;
export default searchSlice.reducer;
