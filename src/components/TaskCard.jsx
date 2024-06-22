import React, { useState, useEffect } from "react";
import {
  setActiveCard,
  deleteCard,
  updateTask,
} from "../redux/slices/tasksListSlice";
import { useDispatch } from "react-redux";

const TaskCard = ({ task, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(task.name);
  const dispatch = useDispatch();

  useEffect(() => {
    setInputValue(task.name);
  }, [task.name]);

  const dragStart = (e) => {
    dispatch(setActiveCard(index));
  };

  const dragEnd = () => {
    dispatch(setActiveCard(null));
  };

  const handleDeleteCard = () => {
    dispatch(deleteCard(task.name));
  };

  const handleEditCard = () => {
    setIsEditing(true);
  };

  const handleSaveEditedCard = (e) => {
    e.preventDefault();
    setIsEditing(false);
    dispatch(updateTask({ name: task.name, editedTask: inputValue }));
  };

  return (
    <>
      <div
        draggable
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        className="card__wrapper">
        {isEditing ? (
          <>
            <form onSubmit={handleSaveEditedCard}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit">save</button>
            </form>
          </>
        ) : (
          <>
            <p>{task.name}</p>
            <button onClick={handleEditCard}>edit</button>
            <button onClick={handleDeleteCard}>X</button>
          </>
        )}
      </div>
    </>
  );
};

export default TaskCard;
