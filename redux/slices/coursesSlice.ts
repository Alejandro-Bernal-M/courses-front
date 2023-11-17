import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiEndpoints from '@/utils/apiEndpoints';
import type { CourseProps } from '@/types/course';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

const initialState = {
  courses: [] as CourseProps[],
  course: {
    _id: 'fetching data',
    name: '',
    description: '',
    thumbnail: '',
    enrollmentStatus: '',
    duration: '',
    prerequisites: ['fetching data'],

  } as CourseProps,
  loading: true,
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

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async({formData, token} : {formData: FormData, token: string}) => {
    try {
      const config = {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data'
        }
      }
      const response = await axios.post(apiEndpoints.createCourse, formData, config);
      return response.data;
    } catch (error) {
      if(error instanceof AxiosError){
        if(error.response?.status == 401){
          toast.error('Session expired, please login again')
          return {error: true};
        }
      }
      console.log('error from async', error)
      toast.error('Error creating course');
    }
  }
);


export const getSpecificCourseSignin = createAsyncThunk(
  'courses/getSpecificCourseSignin',
  async({userId, courseId, token}: {userId: string, courseId: string, token: string}) => {
    try {
      const config = {
        headers: {
          Authorization:  token},
        };
      const response = await axios.get(`${apiEndpoints.specificCourseSignin(userId, courseId)}`,
      config);
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
    builder.addCase(getSpecificCourseSignin.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSpecificCourseSignin.fulfilled, (state, action) => {
      state.loading = false;
      state.course = action.payload.course;
    });
    builder.addCase(getSpecificCourseSignin.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.error('Error fetching course:', action.error);
    });
    builder.addCase(createCourse.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      if(!action.payload.error){
        toast.success('Course created successfully');
        state.courses.push(action.payload);
      }
      state.loading = false;
    });
    builder.addCase(createCourse.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      console.error('Error creating course:', action.error);
    });
  }
});

export default coursesSlice.reducer;