import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiEndpoints from '@/utils/apiEndpoints';
import type { CourseProps } from '@/types/course';

const initialState = {
  courses: [] as CourseProps[],
  course: {},
  loading: false,
  error: false,
}

export const getCourses = createAsyncThunk(
  'courses/getCourses',
  async() => {
    try {
      const response = await axios.get(apiEndpoints.courses);
      return response.data;
    } catch (error) {
      console.log('error', error)
    }
  }
);


const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourses.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.courses = action.payload.filteredCourses;
    });
    builder.addCase(getCourses.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.error('Error fetching courses:', action.error);
    });
  }
});

export default coursesSlice.reducer;