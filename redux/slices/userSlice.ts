import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiEndpoints from '@/utils/apiEndpoints';

export const getenrolledCourses = createAsyncThunk(
  'user/getenrolledCourses',
  async (token: string) => {
    const config = {
      headers: {
        Authorization: token,
      },
    }
    const response = await axios.get(apiEndpoints.getEnrolled, config);
    console.log(response.data)
    return response.data;
  }
);

const initialState = {
  name: '',
  email: '',
  id: '',
  token: '',
  isLogged: true,
  enrolledCourses: [],
  loading: false,
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
  },
  extraReducers: (builder) => {
    builder.addCase(getenrolledCourses.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getenrolledCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.enrolledCourses = action.payload.courses;
    });
    builder.addCase(getenrolledCourses.rejected, (state, action) => {
      state.loading = false;
      toast.error('Error fetching enrolled courses');
    });
  }
})

export const { signin, logout } = userSlice.actions;
export default userSlice.reducer;