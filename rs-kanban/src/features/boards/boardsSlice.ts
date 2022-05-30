import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBoard, getAllBoards, deleteBoard } from './../../api/boards';
import { BoardsState, NewBoardPayload } from './../interfaces/board';

const initialState: BoardsState = {
  boardId: '',
  boards: [],
  columns: [],
  tasks: [],
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
      state.boards.push(action.payload);
    },
    deleteBoardById: (state, action) => {
      state.boards = state.boards.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addBoardId, addBoard, getBoards, deleteBoardById } = boardsSlice.actions;

export default boardsSlice.reducer;
