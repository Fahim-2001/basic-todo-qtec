import { createSlice } from "@reduxjs/toolkit";

export const timeSlice = createSlice({
  name: "time",
  initialState: {
    startTimeInput: "",
    endTimeInput: "",
  },
  reducers: {
    setStartTimeInput: (state, action) => {
      state.startTimeInput = action.payload;
    },
    setEndTimeInput: (state, action) => {
      state.endTimeInput = action.payload;
    },
  },
});

export const { setStartTimeInput, setEndTimeInput } = timeSlice.actions;

export default timeSlice.reducer;
