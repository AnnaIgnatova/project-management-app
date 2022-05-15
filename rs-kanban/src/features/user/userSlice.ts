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
      state.user.name = action.payload.name;
      state.user.login = action.payload.login;
    },
  },
});

export const { createUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
