import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBoard, getAllBoards } from './../../api/boards';
import { getAllColumns } from './../../api/columns';
import { BoardsState, NewBoardPayload } from 'features/interfaces/board';

const initialState: BoardsState = {
  boardId: '',
  boards: [],
  columns: [],
};

export const getBoardsData = createAsyncThunk(
  'boards/getBoardsData',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await getAllBoards();
      dispatch(getBoards(response));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createNewBoard = createAsyncThunk(
  'boards/createNewBoard',
  async (payload: NewBoardPayload, { dispatch, rejectWithValue }) => {
    try {
      const board = await createBoard(payload);
      dispatch(addBoard(board));
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

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    getBoards: (state, action) => {
      state.boards = action.payload;
    },
    addBoardId: (state, action) => {
      state.boardId = action.payload;
    },
    addBoard: (state, action) => {
      state.boards = [...state.boards, action.payload];
    },
    addCols: (state, action) => {
      state.columns = action.payload;
    },
  },
});

export const { addBoardId, addBoard, addCols, getBoards } = boardsSlice.actions;

export default boardsSlice.reducer;
