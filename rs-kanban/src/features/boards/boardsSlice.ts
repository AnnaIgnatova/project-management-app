import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllColumns } from './../../api/columns/get-all-columns.api';

const initialState = {
  boardId: '',
  boards: [{}],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoardId: (state, action) => {
      state.boardId = action.payload;
    },
    addBoards: (state, action) => {
      state.boards = [...action.payload];
    },
  },
});

export const { addBoardId } = boardsSlice.actions;
export default boardsSlice.reducer;
