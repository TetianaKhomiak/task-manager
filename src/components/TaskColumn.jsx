import React, { useState } from "react";
import "../styles/TaskColumn.css";
import TaskForm from "./TaskForm";
import { useSelector, useDispatch } from "react-redux";
import { setActiveColumn, deleteColum } from "../redux/slices/columnSlice";
import TaskCards from "./TaskCards";
import { updateTasks } from "../redux/slices/cardSlice";
import { RxCross2 } from "react-icons/rx";

const TaskColumn = ({ title, columnIndex }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { columns } = useSelector((state) => state.column);
  console.log(columns);
  const tasks = useSelector((state) => state.card.tasks);
  const dispatch = useDispatch();

  const handleCreateTask = () => {
    setIsAddingTask(true);
  };

  const handleDeleteColumn = () => {
    if (!columns || !tasks) {
      console.error("Columns or tasks are undefined");
      return;
    }

    const filteredTaskColumnList = columns.filter(
      (column, index) => columnIndex !== index
    );
    const filteredTaskCards = tasks.filter((task) => task.columnName !== title);

    dispatch(deleteColum(filteredTaskColumnList));
    dispatch(updateTasks(filteredTaskCards));
  };

  const handleOnDragStart = () => {
    dispatch(setActiveColumn(columnIndex));
  };

  const handleOnDragEnd = () => {
    dispatch(setActiveColumn(null));
  };

  return (
    <div
      className="column__wrapper"
      draggable
      onDragStart={handleOnDragStart}
      onDragEnd={handleOnDragEnd}>
      <div className="column__title">
        <h3>{title}</h3>
        {title !== "To Do" && (
          <button onClick={handleDeleteColumn} className="column__delete-btn">
            <RxCross2 className="column__delete-icon" />
          </button>
        )}
      </div>
      <div>
        <TaskCards columnName={title} />
        {isAddingTask ? (
          <TaskForm setIsAddingTask={setIsAddingTask} columnName={title} />
        ) : (
          <button className="column__create-btn" onClick={handleCreateTask}>
            + Create Task
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
