import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addColumn } from "../redux/slices/columnSlice";

const AddColumnForm = () => {
  const columns = useSelector((state) => state.column.columns);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [selectValue, setSelectValue] = useState("In Progress");
  const dispatch = useDispatch();

  const handleAddTaskColumn = (e) => {
    e.preventDefault();
    if (selectValue) {
      dispatch(addColumn({ selectValue, idColumn: uuidv4() }));
      setIsAddingColumn(!isAddingColumn);
    }
    setSelectValue("In Progress");
  };

  const handleCancelAdding = () => {
    setIsAddingColumn(false);
    setSelectValue("In Progress");
  };

  const handleAddColumnButtonClick = () => {
    setIsAddingColumn(!isAddingColumn);
  };

  const isOptionDisabled = (option) => {
    return columns.some((column) => column.name === option);
  };
  return (
    <div>
      {isAddingColumn ? (
        <>
          <form className="board__form" onSubmit={handleAddTaskColumn}>
            <select
              name="category"
              className="board__select"
              onChange={(e) => setSelectValue(e.target.value)}
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
  );
};

export default AddColumnForm;
