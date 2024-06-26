import React from "react";
import "../styles/SubDropdownMenu.css";
import { useSelector, useDispatch } from "react-redux";
import { updateTasks } from "../redux/slices/tasksListSlice";
import { addColumn } from "../redux/slices/taskColumnsSlice";

const SubDropdownMenu = ({ task }) => {
  const tasks = useSelector((state) => state.tasksList.task);
  const columns = useSelector((state) => state.columns);
  const buttonsText = ["To Do", "In Progress", "On Hold", "Completed"];
  const currentTask = tasks.find((item) => item.id === task.id);
  const currentColumn = currentTask ? currentTask.columnName : "";
  const dispatch = useDispatch();

  const handleMoveTask = (currentTask, newColumn) => {
    const columnExists = columns?.columns.includes(newColumn);
    if (!columnExists) {
      dispatch(addColumn(newColumn));
    }

    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id ? { ...task, columnName: newColumn } : task
    );

    dispatch(updateTasks(updatedTasks));
  };

  return (
    <div className="subdropdown-menu">
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
