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
  const tasks = useSelector((state) => state.card.task);
  const dispatch = useDispatch();
  console.log(columns);
  const handleCreateTask = () => {
    setIsAddingTask(true);
  };

  const handleDeleteColumn = () => {
    if (!columns || !tasks) {
      console.error("Columns or tasks are undefined");
      return;
    }

    const filteredTaskColumnList = columns.filter(
      (_, index) => columnIndex !== index
    );
    const filteredTaskCards = tasks.filter((task) => task.columnName !== title);

    dispatch(deleteColum(filteredTaskColumnList));
    dispatch(updateTasks(filteredTaskCards));
  };

  return (
    <div className="column__wrapper">
      <div
        draggable
        onDragStart={() => dispatch(setActiveColumn(columnIndex))}
        onDragEnd={() => dispatch(setActiveColumn(null))}>
        <div className="column__title">
          <h3>{title}</h3>
          {title !== "To Do" && (
            <button onClick={handleDeleteColumn} className="column__delete-btn">
              <RxCross2 className="column__delete-icon" />
            </button>
          )}
        </div>

        {isAddingTask ? (
          <>
            <TaskCards columnName={title} />
            <TaskForm setIsAddingTask={setIsAddingTask} columnName={title} />
          </>
        ) : (
          <>
            <TaskCards columnName={title} />
            <button className="column__create-btn" onClick={handleCreateTask}>
              + Create Task
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
