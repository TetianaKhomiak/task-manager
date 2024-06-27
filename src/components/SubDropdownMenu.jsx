import React from "react";
import "../styles/SubDropdownMenu.css";
import { useDispatch } from "react-redux";
import { updateTasks } from "../redux/slices/tasksListSlice";
import { addColumn } from "../redux/slices/taskColumnsSlice";

const SubDropdownMenu = ({
  tasks,
  currentIndexColumn,
  currentColumn,
  currentTask,
  columns,
}) => {
  const dispatch = useDispatch();
  const buttonsText = ["To Do", "In Progress", "On Hold", "Completed"];

  const handleMoveTask = (currentTask, newColumn) => {
    const columnExists = columns.includes(newColumn);
    if (!columnExists) {
      dispatch(addColumn(newColumn));
    }

    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id ? { ...task, columnName: newColumn } : task
    );

    dispatch(updateTasks(updatedTasks));
  };

  return (
    <div
      className={
        currentIndexColumn == 3 ? "subdropdown-menu__last" : "subdropdown-menu"
      }>
      {buttonsText.map((buttonText) => (
        <button
          key={buttonText}
          onClick={() => handleMoveTask(currentTask, buttonText)}
          disabled={buttonText === currentColumn}
          className="subdropdown-menu__btn"
          style={buttonText === currentColumn ? { opacity: 0.4 } : {}}>
          {buttonText}
        </button>
      ))}
    </div>
  );
};

export default SubDropdownMenu;
