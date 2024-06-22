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
    deleteCard: (state, action) => {
      const updatedTasks = state.task.filter(
        (item) => item.name !== action.payload
      );
      state.task = updatedTasks;
    },
  },
});

export default tasksListSlice.reducer;
export const { addTask, updateTasks, setActiveCard, deleteCard } =
  tasksListSlice.actions;
