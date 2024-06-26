import { createSlice } from "@reduxjs/toolkit";

export const columnsKey = "columns";
export const isAddingColumnKey = "isAddingColumn";
export const selectValueKey = "selectValue";
export const activeCardKey = "activeCard";

const initialState = {
  columns: JSON.parse(localStorage.getItem(columnsKey)) ?? ["To Do"],
  isAddingColumn: JSON.parse(localStorage.getItem(isAddingColumnKey)) ?? false,
  selectValue:
    JSON.parse(localStorage.getItem(selectValueKey)) ?? "In Progress",
  activeCard: JSON.parse(localStorage.getItem(activeCardKey)) ?? null,

  // columns: ["To Do"],
  // isAddingColumn: false,
  // selectValue: "In Progress",
  // activeCard: null,
};

export const taskColumnsSlice = createSlice({
  name: "taskColumns",
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
    setActiveCard: (state, action) => {
      state.activeCard = action.payload;
    },
    deleteColum: (state, action) => {
      state.columns = action.payload;
    },
  },
});

export default taskColumnsSlice.reducer;
export const {
  setIsAddingColumn,
  setSelectValue,
  addColumn,
  cancleAdding,
  dropColumn,
  setActiveCard,
  deleteColum,
} = taskColumnsSlice.actions;
