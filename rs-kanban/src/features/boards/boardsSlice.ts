import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UpdateColTitleProps } from 'features/interfaces/updateTitle';
import { getAllBoards } from './../../api/boards';
import { getAllColumns, updateColumn } from './../../api/columns';

const initialState = {
  boardId: '',
  boards: [],
  columns: [],
};

export const getBoardsData = createAsyncThunk(
  'boards/getBoardsData',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await getAllBoards();
      dispatch(addBoards(response));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getColsData = createAsyncThunk(
  'boards/getColsData',
  async (payload: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await getAllColumns(payload);

      dispatch(addCols(response));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateColumnTitle = createAsyncThunk(
  'boards/updateColumnTitle',
  async (payload: UpdateColTitleProps, { dispatch, rejectWithValue }) => {
    try {
      const { boardId, id, title, order } = payload;
      await updateColumn(boardId, id, { title, order });
      const response = await getAllColumns(boardId);
      dispatch(addCols(response));
    } catch (err) {
      return rejectWithValue(err);
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
});

export const { addBoardId, addBoards, addCols } = boardsSlice.actions;
export default boardsSlice.reducer;
