import { createSlice } from "@reduxjs/toolkit";

export const taskKey = "task";
export const activeCardKey = "activeCard";

const initialState = {
  task: JSON.parse(localStorage.getItem(taskKey)) ?? [],
  activeCard: JSON.parse(localStorage.getItem(activeCardKey)) ?? null,
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.task = [...state.task, action.payload];
    },
    updateTaskName: (state, action) => {
      const { id, editedTask } = action.payload;
      const updatedTasks = state.task.map((item) => {
        if (item.id === id) {
          item.name = editedTask;
        }
        return item;
      });
      state.task = updatedTasks;
    },

    updateTaskDescription: (state, action) => {
      const { id, description } = action.payload;
      const updatedTasks = state.task.map((item) => {
        if (item.id === id) {
          item.description = description;
        }
        return item;
      });
      state.task = updatedTasks;
    },
    updateDeadline: (state, action) => {
      const { id, deadline } = action.payload;
      const updatedTasks = state.task.map((item) => {
        if (item.id === id) {
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
        (item) => item.id !== action.payload
      );
      state.task = updatedTasks;
    },
    setColor: (state, action) => {
      const { id, selectedColor } = action.payload;
      const updatedSelectedColor = state.task.map((item) => {
        if (item.id === id) {
          item.selectedColor = selectedColor;
        }
        return item;
      });
      state.task = updatedSelectedColor;
    },
  },
});

export default cardSlice.reducer;
export const {
  addTask,
  updateTasks,
  setActiveCard,
  deleteCard,
  updateTaskName,
  updateDeadline,
  updateTaskDescription,
  setColor,
} = cardSlice.actions;
