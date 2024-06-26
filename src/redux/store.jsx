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
  setActiveCard,
  deleteColum,
  columnsKey,
  isAddingColumnKey,
  selectValueKey,
  activeCardKey,
} from "./slices/taskColumnsSlice";
import tasksListReducer from "./slices/tasksListSlice";

const localStorageMiddleware = createListenerMiddleware();

localStorageMiddleware.startListening({
  matcher: isAnyOf(
    setIsAddingColumn,
    setSelectValue,
    addColumn,
    cancleAdding,
    dropColumn,
    setActiveCard,
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
      activeCardKey,
      JSON.stringify(state.taskColumns.activeCard)
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
