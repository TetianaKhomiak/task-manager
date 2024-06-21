import { configureStore } from "@reduxjs/toolkit";
import TaskColumnsReducer from "./slices/TaskColumnsSlice";

export const store = configureStore({
  reducer: {
    taskColumns: TaskColumnsReducer,
  },
});
