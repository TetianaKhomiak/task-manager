import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import columnReducer, {
  setIsAddingColumn,
  setSelectValue,
  addColumn,
  cancleAdding,
  dropColumn,
  setActiveColumn,
  deleteColum,
  columnsKey,
  isAddingColumnKey,
  selectValueKey,
  activeColumnKey,
} from "./slices/columnSlice";
import cardReducer, {
  addTask,
  updateTasks,
  setActiveCard,
  deleteCard,
  updateTaskName,
  updateDeadline,
  updateTaskDescription,
  setColor,
  dropCard,
  tasksKey,
  activeCardKey,
} from "./slices/cardSlice";

const localStorageMiddleware = createListenerMiddleware();

localStorageMiddleware.startListening({
  matcher: isAnyOf(
    setIsAddingColumn,
    setSelectValue,
    addColumn,
    cancleAdding,
    dropColumn,
    setActiveColumn,
    deleteColum,
    addTask,
    updateTasks,
    setActiveCard,
    deleteCard,
    updateTaskName,
    updateDeadline,
    updateTaskDescription,
    setColor,
    dropCard
  ),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    localStorage.setItem(columnsKey, JSON.stringify(state.column.columns));
    localStorage.setItem(
      isAddingColumnKey,
      JSON.stringify(state.column.isAddingColumn)
    );
    localStorage.setItem(
      selectValueKey,
      JSON.stringify(state.column.selectValue)
    );
    localStorage.setItem(
      activeColumnKey,
      JSON.stringify(state.column.activeColumn)
    );
    localStorage.setItem(tasksKey, JSON.stringify(state.card.tasks));
    localStorage.setItem(activeCardKey, JSON.stringify(state.card.activeCard));
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
