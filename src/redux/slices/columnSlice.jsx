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
    cancleAdding: (state) => {
      state.isAddingColumn = false;
      state.selectValue = "In Progress";
    },
    dropColumn: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedColumn] = state.columns.splice(fromIndex, 1);
      state.columns.splice(toIndex, 0, movedColumn);
    },
    setActiveColumn: (state, action) => {
      state.activeColumn = action.payload;
    },
    deleteColum: (state, action) => {
      state.columns = action.payload;
    },
  },
});

export default columnSlice.reducer;
export const {
  setIsAddingColumn,
  setSelectValue,
  addColumn,
  cancleAdding,
  dropColumn,
  setActiveColumn,
  deleteColum,
} = columnSlice.actions;
