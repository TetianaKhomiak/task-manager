import React, { useState } from "react";
import "../styles/TaskColumn.css";
import TaskForm from "./TaskForm";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCard, deleteColum } from "../redux/slices/taskColumnsSlice";
import TaskCards from "./TaskCards";

const TaskColumn = ({ title, columnIndex }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { columns } = useSelector((state) => state.taskColumns);
  const dispatch = useDispatch();

  const handleCreateTask = () => {
    setIsAddingTask(true);
  };

  const handleDeleteColumn = () => {
    const filteredTaskColumnList = columns.filter(
      (task, index) => columnIndex !== index
    );
    dispatch(deleteColum(filteredTaskColumnList));
  };

  const handleDragStart = () => {
    dispatch(setActiveCard(columnIndex));
  };

  const handleDragEnd = () => {
    dispatch(setActiveCard(null));
  };

  return (
    <div
      className="column__wrapper"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <div className="column__title">
        <h3>{title}</h3>
        {title !== "To do" && <button onClick={handleDeleteColumn}>X</button>}
      </div>

      {isAddingTask ? (
        <>
          <TaskCards columnName={title} />
          <TaskForm setIsAddingTask={setIsAddingTask} columnName={title} />
        </>
      ) : (
        <>
          <TaskCards columnName={title} />
          <button onClick={handleCreateTask}>+ Create Task</button>
        </>
      )}
    </div>
  );
};

export default TaskColumn;
