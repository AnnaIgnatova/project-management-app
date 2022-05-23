import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  board: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getBoard: (state, action) => {
      state.board = action.payload;
    },
  },
});

export const { getBoard } = boardSlice.actions;
export default boardSlice.reducer;
