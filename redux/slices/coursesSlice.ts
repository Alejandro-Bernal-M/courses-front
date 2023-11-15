import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  course: {},
  loading: false,
  error: null,
}

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {}
});

export default coursesSlice.reducer;