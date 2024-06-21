import { configureStore } from "@reduxjs/toolkit";
import taskColumnsReducer from "./slices/TaskColumnsSlice";
import tasksListReducer from "./slices/tasksListSlice";

export const store = configureStore({
  reducer: {
    taskColumns: taskColumnsReducer,
    tasksList: tasksListReducer,
  },
});
