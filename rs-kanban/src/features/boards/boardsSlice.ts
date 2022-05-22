import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBoard, getAllBoards, deleteBoard } from './../../api/boards';
import { BoardsState, NewBoardPayload } from './../interfaces/board';
import { UpdateColTitleProps } from 'features/interfaces/updateTitle';
import { getAllColumns, updateColumn } from './../../api/columns';

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

export const deleteBoardCard = createAsyncThunk(
  'boards/deleteBoardCard',
  async (payload: string, { dispatch, rejectWithValue }) => {
    try {
      await deleteBoard(payload);
      dispatch(deleteBoardById(payload));
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
    getBoards: (state, action) => {
      state.boards = action.payload;
    },
    addBoardId: (state, action) => {
      state.boardId = action.payload;
    },
    addBoard: (state, action) => {
      state.boards = [...state.boards, action.payload];
    },
    deleteBoardById: (state, action) => {
      state.boards = state.boards.filter(({ id }) => id !== action.payload);
    },
    addCols: (state, action) => {
      state.columns = action.payload;
    },
    createColumnReducer: (state, action) => {
      state.columns.push(action.payload);
    },
  },
});

export const { addBoardId, addBoard, addCols, getBoards, deleteBoardById, createColumnReducer } =
  boardsSlice.actions;

export default boardsSlice.reducer;
