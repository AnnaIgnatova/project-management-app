import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isToken: false,
  token: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    getToken: (state, action) => {
      state.isToken = action.payload;
    },
    saveToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { getToken, saveToken } = tokenSlice.actions;
export default tokenSlice.reducer;
