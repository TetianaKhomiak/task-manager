import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import columnReducer, {
  addColumn,
  deleteColumn,
  updateColumns,
  moveTaskToNewColumn,
  columnsKey,
} from "./slices/columnSlice";
import cardReducer, {
  addTask,
  updateTasks,
  deleteCard,
  updateTaskName,
  updateDeadline,
  updateTaskDescription,
  setColor,
  tasksKey,
} from "./slices/cardSlice";

const localStorageMiddleware = createListenerMiddleware();

localStorageMiddleware.startListening({
  matcher: isAnyOf(
    addColumn,
    deleteColumn,
    updateColumns,
    moveTaskToNewColumn,
    addTask,
    updateTasks,
    deleteCard,
    updateTaskName,
    updateDeadline,
    updateTaskDescription,
    setColor
  ),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    localStorage.setItem(columnsKey, JSON.stringify(state.column.columns));

    localStorage.setItem(tasksKey, JSON.stringify(state.card.tasks));
  },
});

export const store = configureStore({
  reducer: {
    column: columnReducer,
    card: cardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware.middleware),
});
