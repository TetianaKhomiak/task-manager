import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { updateTasks } from "../redux/slices/cardSlice";
import { moveTaskToNewColumn } from "../redux/slices/columnSlice";
import "../styles/SubDropdownMenu.css";

const SubDropdownMenu = ({
  tasks,
  currentIndexColumn,
  currentColumnName,
  currentTask,
}) => {
  const buttonsText = ["To Do", "In Progress", "On Hold", "Completed"];
  const columns = useSelector((state) => state.column.columns);
  const dispatch = useDispatch();

  const handleMoveTask = (currentTask, newColumnName) => {
    const columnExists = columns.some(
      (column) => column.name === newColumnName
    );

    if (!columnExists) {
      dispatch(moveTaskToNewColumn({ id: uuidv4(), name: newColumnName }));
    }

    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id ? { ...task, columnName: newColumnName } : task
    );

    dispatch(updateTasks(updatedTasks));
  };

  return (
    <div
      className={
        currentIndexColumn > 3 ? "subdropdown-menu__last" : "subdropdown-menu"
      }>
      {buttonsText.map((buttonText) => (
        <button
          key={buttonText}
          onClick={() => handleMoveTask(currentTask, buttonText)}
          disabled={buttonText === currentColumnName}
          className="subdropdown-menu__btn"
          style={buttonText === currentColumnName ? { opacity: 0.4 } : {}}>
          {buttonText}
        </button>
      ))}
    </div>
  );
};

export default SubDropdownMenu;
