import React, { useState } from "react";
import "../styles/TaskColumn.css";
import TaskForm from "./TaskForm";
import { useSelector, useDispatch } from "react-redux";
import {
  addColumn,
  setActiveCard,
  deleteColum,
} from "../redux/slices/taskColumnsSlice";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, columnIndex }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const tasks = useSelector((state) => state.tasksList.task);

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
          <TaskCard columnName={title} />
          <TaskForm setIsAddingTask={setIsAddingTask} columnName={title} />
        </>
      ) : (
        <>
          <TaskCard columnName={title} />
          <button onClick={handleCreateTask}>+ Create Task</button>
        </>
      )}
    </div>
  );
};

export default TaskColumn;
