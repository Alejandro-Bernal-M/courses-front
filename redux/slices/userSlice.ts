import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  name: '',
  email: '',
  id: '',
  token: '',
  isLogged: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin: (state, action) => {
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.token = action.payload.token;
      state.id = action.payload.user._id;
      state.isLogged = true;
    },
    logout: (state) => {
      state.name = '';
      state.email = '';
      state.token = '';
      state.isLogged = false;
      toast.success('Logout successfully');
    },
  }
})

export const { signin, logout } = userSlice.actions;
export default userSlice.reducer;