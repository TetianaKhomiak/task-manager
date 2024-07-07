import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const columnsKey = "columns";

const initialState = {
  columns: JSON.parse(localStorage.getItem(columnsKey)) ?? [
    { id: uuidv4(), name: "To Do" },
  ],
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
    },

    deleteColumn: (state, action) => {
      const filteredTaskColumnList = state.columns.filter(
        (column) => column.id !== action.payload
      );
      state.columns = filteredTaskColumnList;
    },
    updateColumns: (state, action) => {
      state.columns = action.payload;
    },
    moveColumn: (state, action) => {
      const { id, name } = action.payload;

      if (!state.columns.some((column) => column.name === name)) {
        state.columns = [...state.columns, { id: id, name: name }];
      }
    },
  },
});

export default columnSlice.reducer;
export const { addColumn, deleteColumn, updateColumns, moveColumn } =
  columnSlice.actions;
