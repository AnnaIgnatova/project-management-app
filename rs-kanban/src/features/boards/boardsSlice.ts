import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  boardId: '',
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoardId: (state, action) => {
      state.boardId = action.payload;
    },
  },
});

export const { addBoardId } = boardsSlice.actions;
export default boardsSlice.reducer;
