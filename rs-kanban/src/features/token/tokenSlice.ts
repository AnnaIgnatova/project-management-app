import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isToken: false,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    getToken: (state, action) => {
      state.isToken = action.payload;
    },
  },
});

export const { getToken } = tokenSlice.actions;
export default tokenSlice.reducer;
