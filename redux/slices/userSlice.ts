import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiEndpoints from '@/utils/apiEndpoints';
import { AxiosError } from 'axios';


export const getenrolledCourses = createAsyncThunk(
  'user/getenrolledCourses',
  async (token: string) => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      }
      const response = await axios.get(apiEndpoints.getEnrolled, config);
      return response.data;
    } catch (error) {
      if(error instanceof AxiosError){
        if(error.response?.status == 401){
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          return {isLogged: false}
        }
      }
    }
    }
);

const initialState = {
  name: '',
  email: '',
  id: '',
  token: '',
  role: '',
  isLogged: false,
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
      state.role = action.payload.user.role;
      state.isLogged = true;
    },
    logout: (state) => {
      state.name = '';
      state.email = '';
      state.token = '';
      state.isLogged = false;
      state.id = '';
      state.role = '';
      toast.success('Logout successfully');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getenrolledCourses.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getenrolledCourses.fulfilled, (state, action) => {
      state.loading = false;
      if(action.payload.isLogged == false){
        state.enrolledCourses = [];
        state.isLogged = false;
      }else{
        state.enrolledCourses = action.payload.courses;
      }
    });
    builder.addCase(getenrolledCourses.rejected, (state, action) => {
      state.loading = false;
      toast.error('Error fetching enrolled courses');
    });
  }
})

export const { signin, logout } = userSlice.actions;
export default userSlice.reducer;