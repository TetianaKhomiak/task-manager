import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, useSortable } from "@dnd-kit/sortable";
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
  const columns = useSelector((state) => state.column.columns);
  const tasks = useSelector((state) => state.card.tasks);
  const dispatch = useDispatch();

  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleCreateTask = () => {
    setIsAddingTask(true);
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: idColumn });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };
  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEndTask = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;
    const originalPos = getTaskPos(active.id);
    const newPos = getTaskPos(over.id);
    const newTasks = arrayMove(tasks, originalPos, newPos);

    dispatch(updateTasks(newTasks));
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEndTask}
      collisionDetection={closestCorners}>
      <div
        className="column__wrapper"
        ref={setNodeRef}
        {...attributes}
        style={style}>
        <div className="column__wrapper_title">
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
    </DndContext>
  );
};

export default TaskColumn;
