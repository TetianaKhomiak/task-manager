import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addColumn,
  cancelAdding,
  setIsAddingColumn,
  setSelectValue,
} from "../redux/slices/columnSlice";
import "../styles/TaskBoard.css";
import TaskColumn from "./TaskColumn";

const TaskBoard = () => {
  const dispatch = useDispatch();
  const { columns, isAddingColumn, selectValue } = useSelector(
    (state) => state.column
  );

  const handleAddTaskColumn = (e) => {
    e.preventDefault();
    if (selectValue) {
      dispatch(addColumn({ selectValue, idColumn: uuidv4() }));
    }
  };

  const handleSelectChange = (e) => {
    dispatch(setSelectValue(e.target.value));
  };

  const handleCancelAdding = () => {
    dispatch(cancelAdding());
  };

  const handleAddColumnButtonClick = () => {
    dispatch(setIsAddingColumn(true));
  };

  const isOptionDisabled = (option) => {
    return columns.find((column) => column.name === option);
  };

  return (
    <div className="board__wrapper">
      <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
        {columns &&
          columns.length > 0 &&
          columns.map((column) => (
            <TaskColumn
              key={column.id}
              title={column.name}
              idColumn={column.id}
            />
          ))}
      </SortableContext>

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
                style={{ opacity: isOptionDisabled(selectValue) ? 0.5 : 1 }}
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
