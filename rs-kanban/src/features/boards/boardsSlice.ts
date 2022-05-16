import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllBoards } from './../../api/boards';
import { getAllColumns } from './../../api/columns';

const initialState = {
  boardId: '',
  boards: [],
  columns: [],
};

export interface Board {
  id: string;
  title: string;
}

export const getBoardsData = createAsyncThunk(
  'boards/getBoardsData',
  async (payload, { dispatch }) => {
    try {
      const response = await getAllBoards();
      dispatch(addBoards(response));
    } catch (err) {
      dispatch(addBoards([]));
    }
  }
);

export const getColsData = createAsyncThunk(
  'boards/getColsData',
  async (payload: string, { dispatch }) => {
    console.log(payload);
    try {
      const response = await getAllColumns(payload);

      dispatch(addCols(response));
    } catch (err) {
      dispatch(addCols([]));
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
    addCols: (state, action) => {
      state.columns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardsData.pending, (state, action) => {});
    builder.addCase(getBoardsData.fulfilled, (state, action) => {});
    builder.addCase(getBoardsData.rejected, (state, action) => {});
    builder.addCase(getColsData.pending, (state, action) => {});
    builder.addCase(getColsData.fulfilled, (state, action) => {});
    builder.addCase(getColsData.rejected, (state, action) => {});
  },
});

export const { addBoardId, addBoards, addCols } = boardsSlice.actions;
export default boardsSlice.reducer;
