import React from "react";
import { setActiveCard, deleteCard } from "../redux/slices/tasksListSlice";
import { useDispatch } from "react-redux";

const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();

  const dragStart = (e) => {
    dispatch(setActiveCard(index));
  };

  const dragEnd = () => {
    dispatch(setActiveCard(null));
  };

  const handleDeleteCard = () => {
    dispatch(deleteCard(task.name));
  };

  return (
    <div
      draggable
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      className="card__wrapper">
      <p>{task.name}</p>
      <button onClick={handleDeleteCard}>X</button>
    </div>
  );
};

export default TaskCard;
