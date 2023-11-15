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
  reducers: {},
  extraReducers:{

  }
});

export default coursesSlice.reducer;