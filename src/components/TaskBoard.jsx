import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTasks } from "../redux/slices/cardSlice";
import { updateColumns } from "../redux/slices/columnSlice";
import "../styles/TaskBoard.css";
import AddColumnForm from "./AddColumnForm";
import TaskColumn from "./TaskColumn";

const TaskBoard = () => {
  const columns = useSelector((state) => state.column.columns);
  const tasks = useSelector((state) => state.card.tasks);
  const dispatch = useDispatch();
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    })
  );

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;
    if (
      active.data.current?.type === "Column" &&
      over.data.current?.type === "Column"
    ) {
      const activeIndex = columns.findIndex((col) => col.id === active.id);
      const overIndex = columns.findIndex((col) => col.id === over.id);

      const reorderedColumns = arrayMove(columns, activeIndex, overIndex);
      dispatch(updateColumns(reorderedColumns));
      return;
    }
    if (
      active.data.current?.type === "Task" &&
      over.data.current?.type === "Task"
    ) {
      const activeIndex = tasks.findIndex((task) => task.id === active.id);
      const overIndex = tasks.findIndex((task) => task.id === over.id);

      // Update task position within the same column
      if (tasks[activeIndex].columnId === tasks[overIndex].columnId) {
        const reorderedTasks = arrayMove(tasks, activeIndex, overIndex);
        dispatch(updateTasks(reorderedTasks));
      }
    } else if (
      active.data.current?.type === "Task" &&
      over.data.current?.type === "Column"
    ) {
      const activeIndex = tasks.findIndex((task) => task.id === active.id);
      const newColumnId = over.id;
      const newColumnName = columns.find((col) => col.id === newColumnId)?.name;

      const updatedTasks = tasks.map((task, index) => {
        if (index === activeIndex) {
          return {
            ...task,
            columnId: newColumnId,
            columnName: newColumnName,
          };
        }
        return task;
      });

      dispatch(updateTasks(updatedTasks));
    }
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      const overTask = tasks[overIndex];
      const updatedTasks = tasks.map((task) => {
        if (task.id === activeId) {
          return {
            ...task,
            columnId: tasks[overIndex].columnId,
            columnName: overTask.columnName,
          };
        }
        return task;
      });
      const movedTasks = arrayMove(updatedTasks, activeIndex, overIndex);
      dispatch(updateTasks(movedTasks));
    }

    const isOverAColumn = over.data.current?.type === "Column";
    // Dropping a task over another column
    if (isActiveATask && isOverAColumn) {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const newColumnId = overId;
      const newColumnName = columns.find((col) => col.id === newColumnId)?.name;

      const updatedTasks = tasks.map((task, index) => {
        if (index === activeIndex) {
          return {
            ...task,
            columnId: newColumnId,
            columnName: newColumnName,
          };
        }
        return task;
      });

      const newTasks = arrayMove(updatedTasks, activeIndex, activeIndex);
      dispatch(updateTasks(newTasks));
    }
  }

  console.log(tasks);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}>
      <div className="board__wrapper">
        <SortableContext items={columnsId}>
          {columns &&
            columns.length > 0 &&
            columns.map((column) => (
              <TaskColumn
                key={column.id}
                title={column.name}
                idColumn={column.id}
                column={column}
              />
            ))}
        </SortableContext>
        <AddColumnForm />
      </div>
    </DndContext>
  );
};

export default TaskBoard;
