import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterPriority: "all",
  },
  reducers: {
    setFilterPriority: (state, action) => {
      state.filterPriority = action.payload;
    },
  },
});

export const { setFilterPriority } = filterSlice.actions;

export default filterSlice.reducer;
