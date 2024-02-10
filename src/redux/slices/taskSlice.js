import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    taskInput: "",
    editingTaskId: null,
    editInput: "",
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setTaskInput: (state, action) => {
      state.taskInput = action.payload;
    },
    setEditingTaskId: (state, action) => {
      state.editingTaskId = action.payload;
    },
    setEditInput: (state, action) => {
      state.editInput = action.payload;
    },
  },
});

export const {
  setTasks,
  setTaskInput,
  setEditingTaskId,
  setEditInput,
} = tasksSlice.actions;

export default tasksSlice.reducer;
