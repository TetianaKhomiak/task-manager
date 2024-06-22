import React from "react";
import { setActiveCard } from "../redux/slices/tasksListSlice";
import { useDispatch } from "react-redux";

const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();

  const dragStart = (e) => {
    dispatch(setActiveCard(index));
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const dragEnd = () => {
    dispatch(setActiveCard(null));
  };

  return (
    <div draggable onDragStart={dragStart} onDragEnd={dragEnd}>
      <p>{task.name}</p>
    </div>
  );
};

export default TaskCard;
