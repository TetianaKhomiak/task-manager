import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { updateTasks } from "../redux/slices/cardSlice";
import { deleteColumn } from "../redux/slices/columnSlice";
import "../styles/TaskColumn.css";
import TaskCards from "./TaskCards";
import TaskForm from "./TaskForm";

const TaskColumn = ({ title, idColumn, column }) => {
  const columns = useSelector((state) => state.column.columns);
  const tasks = useSelector((state) => state.card.tasks);
  const dispatch = useDispatch();

  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleCreateTask = () => {
    setIsAddingTask(true);
  };

  const handleDeleteColumn = () => {
    if (!columns || !tasks) {
      console.error("Columns or tasks are undefined");
      return;
    }
    const filteredTaskCards = tasks.filter((task) => task.columnName !== title);

    dispatch(deleteColumn(idColumn));
    dispatch(updateTasks(filteredTaskCards));
  };

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "Column", column },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div className="column__wrapper" ref={setNodeRef} style={style}>
      <div className="column__wrapper_title" {...attributes}>
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
          <TaskForm
            setIsAddingTask={setIsAddingTask}
            columnName={title}
            columnId={column.id}
          />
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
