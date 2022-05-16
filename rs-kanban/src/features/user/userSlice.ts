import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '',
    name: '',
    login: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.user = { ...action.payload };
    },
    deleteUser: (state) => {
      state.user = { id: '', name: '', login: '' };
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { createUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
