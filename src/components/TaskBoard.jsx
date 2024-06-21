import React, { useState } from "react";
import TaskColumn from "./TaskColumn";
import "../styles/TaskBoard.css";
import DropAreaTaskColumn from "./DropAreaTaskColumn";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsAddingColumn,
  setSelectValue,
  addColumn,
  cancleAdding,
  dropColumn,
} from "../redux/slices/taskColumnsSlice";

const TaskBoard = () => {
  const { columns, isAddingColumn, selectValue, activeCard } = useSelector(
    (state) => state.taskColumns
  );
  const dispatch = useDispatch();

  const handleAddTaskColumn = (e) => {
    e.preventDefault();
    if (selectValue) {
      dispatch(addColumn(selectValue));
    }
  };

  const handleSelectChange = (e) => {
    dispatch(setSelectValue(e.target.value));
  };

  const handleCancelAdding = () => {
    dispatch(cancleAdding());
  };

  const handleAddColumnButtonClick = () => {
    dispatch(setIsAddingColumn(true));
  };

  const onDrop = (position) => {
    if (activeCard == null || activeCard === undefined) {
      return;
    }
    dispatch(dropColumn({ fromIndex: activeCard, toIndex: position }));
  };

  return (
    <div className="board__wrapper">
      <DropAreaTaskColumn onDrop={() => onDrop(0)} />
      {columns &&
        columns.length > 0 &&
        columns.map((item, index) => (
          <React.Fragment key={index}>
            <div>
              <TaskColumn title={item} columnIndex={index} />
            </div>
            <DropAreaTaskColumn onDrop={() => onDrop(index + 1)} />
          </React.Fragment>
        ))}
      {isAddingColumn ? (
        <>
          <form onSubmit={handleAddTaskColumn}>
            <select
              name="category"
              onChange={handleSelectChange}
              value={selectValue}>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>

            <button type="submit">Add</button>
            <button type="button" onClick={handleCancelAdding}>
              Cancel
            </button>
          </form>
        </>
      ) : (
        columns.length < 4 && (
          <button
            onClick={handleAddColumnButtonClick}
            className="board__btn_add-column">
            + Add New Category
          </button>
        )
      )}
    </div>
  );
};

export default TaskBoard;
