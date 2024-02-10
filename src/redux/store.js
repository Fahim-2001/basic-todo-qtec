import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/taskSlice";
import filterSlice from "./slices/filterSlice";
import timeSlice from "./slices/timeSlice";

const store = configureStore({
  reducer: {
    tasks: taskSlice,
    filter: filterSlice,
    time: timeSlice,
  },
});

export default store;
