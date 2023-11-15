import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./slices/coursesSlice";

const store = configureStore({
    reducer: {
        courses: coursesReducer,
    }
});

export default store;