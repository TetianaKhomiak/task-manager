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
    updateTask: (state, action) => {
      const { name, editedTask } = action.payload;
      const updatedTasks = state.task.map((item) => {
        if (item.name === name) {
          item.name = editedTask;
        }
        return item;
      });
      state.task = updatedTasks;
    },
    updateDeadline: (state, action) => {
      const { name, deadline } = action.payload;
      const updatedTasks = state.task.map((item) => {
        if (item.name === name) {
          item.deadline = deadline;
        }
        return item;
      });
      state.task = updatedTasks;
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
export const {
  addTask,
  updateTasks,
  setActiveCard,
  deleteCard,
  updateTask,
  updateDeadline,
} = tasksListSlice.actions;
