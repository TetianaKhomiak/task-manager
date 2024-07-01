import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const columnsKey = "columns";
export const isAddingColumnKey = "isAddingColumn";
export const selectValueKey = "selectValue";

const initialState = {
  columns: JSON.parse(localStorage.getItem(columnsKey)) ?? [
    { id: uuidv4(), name: "To Do" },
  ],
  isAddingColumn: JSON.parse(localStorage.getItem(isAddingColumnKey)) ?? false,
  selectValue:
    JSON.parse(localStorage.getItem(selectValueKey)) ?? "In Progress",
};

export const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      const { selectValue, idColumn } = action.payload;
      if (!state.columns.some((column) => column.name === selectValue)) {
        state.columns.push({ id: idColumn, name: selectValue });
      }
      state.selectValue = "In Progress";
      state.isAddingColumn = false;
    },
    setIsAddingColumn: (state, action) => {
      state.isAddingColumn = action.payload;
    },
    setSelectValue: (state, action) => {
      state.selectValue = action.payload;
    },
    cancelAdding: (state) => {
      state.isAddingColumn = false;
      state.selectValue = "In Progress";
    },
    deleteColumn: (state, action) => {
      state.columns = action.payload;
    },
    updateColumns: (state, action) => {
      state.columns = action.payload;
    },
    moveColumn: (state, action) => {
      const { id, name } = action.payload;

      if (!state.columns.some((column) => column.name === name)) {
        state.columns = [...state.columns, { id: id, name: name }];
      }
      state.selectValue = "In Progress";
      state.isAddingColumn = false;
    },
  },
});

export default columnSlice.reducer;
export const {
  setIsAddingColumn,
  setSelectValue,
  addColumn,
  cancelAdding,
  deleteColumn,
  updateColumns,
  moveColumn,
} = columnSlice.actions;
