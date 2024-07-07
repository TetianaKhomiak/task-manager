import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateColumns } from "../redux/slices/columnSlice";
import "../styles/TaskBoard.css";
import AddColumnForm from "./AddColumnForm";
import TaskColumn from "./TaskColumn";

const TaskBoard = () => {
  const columns = useSelector((state) => state.column.columns);
  const dispatch = useDispatch();

  const getColumnPos = (id) => columns.findIndex((column) => column.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;
    const originalPos = getColumnPos(active.id);
    const newPos = getColumnPos(over.id);

    const newColumns = arrayMove(columns, originalPos, newPos);

    dispatch(updateColumns(newColumns));
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className="board__wrapper">
        <SortableContext
          items={columns}
          strategy={horizontalListSortingStrategy}>
          {columns &&
            columns.length > 0 &&
            columns.map((column) => (
              <TaskColumn
                key={column.id}
                title={column.name}
                idColumn={column.id}
              />
            ))}
        </SortableContext>
        <AddColumnForm />
      </div>
    </DndContext>
  );
};

export default TaskBoard;
