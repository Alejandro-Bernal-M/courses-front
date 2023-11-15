import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
        courses: coursesReducer,
        user: userSlice
    }
});

export default store;