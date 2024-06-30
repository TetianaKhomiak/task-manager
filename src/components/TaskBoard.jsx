import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addColumn,
  cancleAdding,
  dropColumn,
  setIsAddingColumn,
  setSelectValue,
} from "../redux/slices/columnSlice";
import "../styles/TaskBoard.css";
import DropAreaColumn from "./DropAreaColumn";
import TaskColumn from "./TaskColumn";

const TaskBoard = () => {
  const { columns, isAddingColumn, selectValue } = useSelector(
    (state) => state.column
  );

  // console.log(columns);
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
    dispatch(dropColumn(position));
  };

  const isOptionDisabled = (option) => {
    return columns.includes(option);
  };

  return (
    <div className="board__wrapper">
      <DropAreaColumn onDrop={() => onDrop(0)} />
      {columns &&
        columns.length > 0 &&
        columns.map((item, index) => (
          <React.Fragment key={index}>
            <TaskColumn title={item} columnIndex={index} />
            <DropAreaColumn onDrop={() => onDrop(index + 1)} />
          </React.Fragment>
        ))}
      <div>
        {isAddingColumn ? (
          <>
            <form className="board__form" onSubmit={handleAddTaskColumn}>
              <select
                name="category"
                className="board__select"
                onChange={handleSelectChange}
                value={selectValue}>
                <option
                  value="In Progress"
                  disabled={isOptionDisabled("In Progress")}>
                  In Progress
                </option>
                <option value="On Hold" disabled={isOptionDisabled("On Hold")}>
                  On Hold
                </option>
                <option
                  value="Completed"
                  disabled={isOptionDisabled("Completed")}>
                  Completed
                </option>
              </select>

              <button
                className="board__btn"
                type="submit"
                disabled={isOptionDisabled(selectValue)}>
                Add
              </button>
              <button
                className="board__btn"
                type="button"
                onClick={handleCancelAdding}>
                Cancel
              </button>
            </form>
          </>
        ) : (
          columns.length < 4 && (
            <button
              onClick={handleAddColumnButtonClick}
              className="board__btn-add_show">
              + New Column
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
