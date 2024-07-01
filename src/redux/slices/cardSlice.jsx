import { createSlice } from "@reduxjs/toolkit";

export const tasksKey = "tasks";
export const activeCardKey = "activeCard";

const initialState = {
  tasks: JSON.parse(localStorage.getItem(tasksKey)) ?? [],
  activeCard: JSON.parse(localStorage.getItem(activeCardKey)) ?? null,
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    // updateTaskName: (state, action) => {
    //   // const { id, editedTask } = action.payload;
    //   // const updatedTasks = state.tasks.map((item) => {
    //   //   if (item.id === id) {
    //   //     item.name = editedTask;
    //   //   }
    //   //   return item;
    //   // });
    //   // state.tasks = updatedTasks;

    // },
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
    setActiveCard: (state, action) => {
      state.activeCard = action.payload;
    },
    deleteCard: (state, action) => {
      const updatedTasks = state.tasks.filter(
        (item) => item.id !== action.payload
      );
      state.tasks = updatedTasks;
    },
    // setColor: (state, action) => {
    //   const { id, selectedColor } = action.payload;
    //   const updatedSelectedColor = state.tasks.map((item) => {
    //     if (item.id === id) {
    //       item.selectedColor = selectedColor;
    //     }
    //     return item;
    //   });
    //   state.tasks = updatedSelectedColor;
    // },
    setColor: (state, action) => {
      const { id, selectedColor } = action.payload;
      state.tasks = state.tasks.map((item) =>
        item.id === id ? { ...item, selectedColor: selectedColor } : item
      );
    },
    dropCard: (state, action) => {
      const { category, position } = action.payload;
      const activeCard = state.activeCard;
      if (activeCard == null || activeCard === undefined) {
        return;
      }
      const taskToMove = state.tasks[activeCard];
      const updatedTasks = state.tasks.filter(
        (task, index) => index !== activeCard
      );
      updatedTasks.splice(position, 0, {
        ...taskToMove,
        columnName: category,
      });
      state.tasks = updatedTasks;
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
  dropCard,
} = cardSlice.actions;
