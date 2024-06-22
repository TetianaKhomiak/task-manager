import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: [],
  activeCard: null,
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
    setActiveCard: (state, action) => {
      state.activeCard = action.payload;
    },
  },
});

export default tasksListSlice.reducer;
export const { addTask, updateTasks, setActiveCard } = tasksListSlice.actions;
