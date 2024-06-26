import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import taskColumnsReducer, {
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
} from "./slices/taskColumnsSlice";
import tasksListReducer, {
  addTask,
  updateTasks,
  setActiveCard,
  deleteCard,
  updateTaskName,
  updateDeadline,
  updateTaskDescription,
  setColor,
  taskKey,
  activeCardKey,
} from "./slices/tasksListSlice";

const localStorageMiddleware = createListenerMiddleware();

localStorageMiddleware.startListening({
  matcher: isAnyOf(
    setIsAddingColumn,
    setSelectValue,
    addColumn,
    cancleAdding,
    dropColumn,
    setActiveColumn,
    deleteColum
  ),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    localStorage.setItem(columnsKey, JSON.stringify(state.taskColumns.columns));
    localStorage.setItem(
      isAddingColumnKey,
      JSON.stringify(state.taskColumns.isAddingColumn)
    );
    localStorage.setItem(
      selectValueKey,
      JSON.stringify(state.taskColumns.selectValue)
    );
    localStorage.setItem(
      activeColumnKey,
      JSON.stringify(state.taskColumns.activeColumn)
    );
  },
});

export const store = configureStore({
  reducer: {
    taskColumns: taskColumnsReducer,
    tasksList: tasksListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware.middleware),
});
