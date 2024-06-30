import { createSlice } from "@reduxjs/toolkit";

export const columnsKey = "columns";
export const isAddingColumnKey = "isAddingColumn";
export const selectValueKey = "selectValue";
export const activeColumnKey = "activeColumn";

const initialState = {
  columns: JSON.parse(localStorage.getItem(columnsKey)) ?? ["To Do"],
  isAddingColumn: JSON.parse(localStorage.getItem(isAddingColumnKey)) ?? false,
  selectValue:
    JSON.parse(localStorage.getItem(selectValueKey)) ?? "In Progress",
  activeColumn: JSON.parse(localStorage.getItem(activeColumnKey)) ?? null,
};

export const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      if (!state.columns.includes(action.payload)) {
        state.columns = [...state.columns, action.payload];
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
    dropColumn: (state, action) => {
      const activeColumn = state.activeColumn;
      const position = action.payload;

      if (activeColumn == null || activeColumn === undefined) {
        return;
      }

      const adjustedDropIndex =
        position > activeColumn ? position - 1 : position;

      const columnToMove = state.columns[activeColumn];
      const updatedColumns = state.columns.filter(
        (_, index) => index !== activeColumn
      );
      updatedColumns.splice(adjustedDropIndex, 0, columnToMove);
      state.columns = updatedColumns;
    },
    setActiveColumn: (state, action) => {
      state.activeColumn = action.payload;
    },
    deleteColumn: (state, action) => {
      state.columns = action.payload;
    },
  },
});

export default columnSlice.reducer;
export const {
  setIsAddingColumn,
  setSelectValue,
  addColumn,
  cancelAdding,
  dropColumn,
  setActiveColumn,
  deleteColumn,
} = columnSlice.actions;
