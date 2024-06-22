import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [],
};

export const tasksListSlice = createSlice({
  name: "tasksList",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.task = [...state.task, action.payload];
    },
    updateTasks: (state, action) => {
      state.task = action.payload;
    },
  },
});

export default tasksListSlice.reducer;
export const { addTask, updateTasks } = tasksListSlice.actions;
