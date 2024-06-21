import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: ["To do"],
  isAddingColumn: false,
  selectValue: "In Progress",
  activeCard: null,
};

export const taskColumnsSlice = createSlice({
  name: "taskColumns",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      state.columns = [...state.columns, action.payload];
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
} = taskColumnsSlice.actions;
