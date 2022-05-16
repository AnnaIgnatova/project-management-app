import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllBoards } from './../../api/boards';

const initialState = {
  boardId: '',
  boards: [],
};

export interface Board {
  id: string;
  title: string;
}

export const getBoardsData = createAsyncThunk(
  'boards/getBoardsData',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await getAllBoards();
      dispatch(addBoards(response));
    } catch (err) {
      dispatch(addBoards([]));
    }
  }
);

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoardId: (state, action) => {
      state.boardId = action.payload;
    },
    addBoards: (state, action) => {
      state.boards = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardsData.pending, (state, action) => {});
    builder.addCase(getBoardsData.fulfilled, (state, action) => {});
    builder.addCase(getBoardsData.rejected, (state, action) => {});
  },
});

export const { addBoardId, addBoards } = boardsSlice.actions;
export default boardsSlice.reducer;
