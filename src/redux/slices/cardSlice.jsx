import { createSlice } from "@reduxjs/toolkit";

export const tasksKey = "tasks";

const initialState = {
  tasks: JSON.parse(localStorage.getItem(tasksKey)) ?? [],
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    updateTaskName: (state, action) => {
      const { id, editedTask } = action.payload;
      state.tasks = state.tasks.map((item) =>
        item.id === id ? { ...item, name: editedTask } : item
      );
    },
    updateTaskDescription: (state, action) => {
      const { id, description } = action.payload;
      const updatedTasks = state.tasks.map((item) => {
        if (item.id === id) {
          item.description = description;
        }
        return item;
      });
      state.tasks = updatedTasks;
    },
    updateDeadline: (state, action) => {
      const { id, deadline } = action.payload;
      const updatedTasks = state.tasks.map((item) => {
        if (item.id === id) {
          item.deadline = deadline;
        }
        return item;
      });
      state.tasks = updatedTasks;
    },

    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },

    deleteCard: (state, action) => {
      const updatedTasks = state.tasks.filter(
        (item) => item.id !== action.payload
      );
      state.tasks = updatedTasks;
    },
    setColor: (state, action) => {
      const { id, selectedColor } = action.payload;
      state.tasks = state.tasks.map((item) =>
        item.id === id ? { ...item, selectedColor: selectedColor } : item
      );
    },
  },
});

export default cardSlice.reducer;
export const {
  addTask,
  updateTasks,
  deleteCard,
  updateTaskName,
  updateDeadline,
  updateTaskDescription,
  setColor,
} = cardSlice.actions;
