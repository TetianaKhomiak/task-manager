import React, { useState } from "react";
import "../styles/TaskColumn.css";
import TaskForm from "./TaskForm";

const TaskColumn = ({
  title,
  columnIndex,
  taskColumnList,
  setTaskColumnList,
  setActiveCard,
  index,
}) => {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleCreateTask = () => {
    setIsAddingTask(true);
  };

  const handleDeleteColumn = () => {
    const filteredTaskColumnList = taskColumnList.filter(
      (task, index) => columnIndex !== index
    );
    setTaskColumnList(filteredTaskColumnList);
  };

  return (
    <div
      className="column__wrapper"
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}>
      <div className="column__title">
        <h3>{title}</h3>
        {title !== "To do" && <button onClick={handleDeleteColumn}>X</button>}
      </div>

      {isAddingTask ? (
        <TaskForm setIsAddingTask={setIsAddingTask} />
      ) : (
        <button onClick={handleCreateTask}>+ create task</button>
      )}
    </div>
  );
};

export default TaskColumn;
