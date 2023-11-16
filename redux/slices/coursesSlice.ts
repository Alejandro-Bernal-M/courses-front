import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiEndpoints from '@/utils/apiEndpoints';
import type { CourseProps } from '@/types/course';
import toast from 'react-hot-toast';

const initialState = {
  courses: [] as CourseProps[],
  course: {
    _id: 'fetching data',
    name: '',
    description: '',
    thumbnail: '',
    enrollmentStatus: '',
    prerequisites: ['fetching data'],

  } as CourseProps,
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

export const getSpecificCourse = createAsyncThunk(
  'courses/getSpecificCourse',
  async(id: string) => {
    try {
      const response = await axios.get(`${apiEndpoints.specificCourse(id)}`);
      return response.data;
    } catch (error) {
      console.log('error', error)
      toast.error('Error fetching course');
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
    builder.addCase(getSpecificCourse.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSpecificCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.course = action.payload;
    });
    builder.addCase(getSpecificCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.error('Error fetching course:', action.error);
    });
  }
});

export default coursesSlice.reducer;