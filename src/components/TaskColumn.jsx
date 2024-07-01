import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { updateTasks } from "../redux/slices/cardSlice";
import { deleteColumn } from "../redux/slices/columnSlice";
import "../styles/TaskColumn.css";
import TaskCards from "./TaskCards";
import TaskForm from "./TaskForm";

const TaskColumn = ({ title, idColumn }) => {
  const dispatch = useDispatch();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { columns } = useSelector((state) => state.column);
  const tasks = useSelector((state) => state.card.tasks);
  console.log(columns);
  const handleCreateTask = () => {
    setIsAddingTask(true);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: idColumn });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDeleteColumn = () => {
    if (!columns || !tasks) {
      console.error("Columns or tasks are undefined");
      return;
    }

    const filteredTaskColumnList = columns.filter(
      (column) => column.id !== idColumn
    );
    const filteredTaskCards = tasks.filter((task) => task.columnName !== title);

    dispatch(deleteColumn(filteredTaskColumnList));
    dispatch(updateTasks(filteredTaskCards));
  };

  return (
    <div
      className="column__wrapper"
      ref={setNodeRef}
      {...attributes}
      style={style}>
      <div className="wrapper">
        <div className="column__title" {...listeners}>
          <h3>{title}</h3>
        </div>

        {title !== "To Do" && (
          <button onClick={handleDeleteColumn} className="column__delete-btn">
            <RxCross2 className="column__delete-icon" />
          </button>
        )}
      </div>
      <div>
        <TaskCards columnName={title} idColumn={idColumn} />
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
