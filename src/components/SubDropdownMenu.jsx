import React from "react";
import { useDispatch } from "react-redux";
import { updateTasks } from "../redux/slices/cardSlice";
import { moveColumn } from "../redux/slices/columnSlice";
import "../styles/SubDropdownMenu.css";

const SubDropdownMenu = ({
  tasks,
  currentIndexColumn,
  currentColumnName,
  currentTask,
  columns,
  idColumn,
}) => {
  const dispatch = useDispatch();
  const buttonsText = ["To Do", "In Progress", "On Hold", "Completed"];

  const handleMoveTask = (currentTask, newColumnName) => {
    const columnExists = columns.some(
      (column) => column.name === newColumnName
    );
    console.log(columnExists);
    if (!columnExists) {
      dispatch(moveColumn({ id: idColumn, name: newColumnName }));
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
