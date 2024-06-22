import React, { useState, useEffect } from "react";
import {
  setActiveCard,
  deleteCard,
  updateTask,
  updateDeadline,
} from "../redux/slices/tasksListSlice";
import { useDispatch } from "react-redux";
import { formatDate, getMinDate } from "../../utils";

const TaskCard = ({ task, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSelectDeadline, setIsDeadline] = useState(false);
  const [inputValue, setInputValue] = useState(task.name);
  const [deadlineValue, setDeadlineValue] = useState(task.deadline || "");
  const [minDate, setMinDate] = useState("");
  const date = formatDate(task.creationDate);
  const dispatch = useDispatch();

  useEffect(() => {
    setInputValue(task.name);
  }, [task.name]);

  useEffect(() => {
    setMinDate(getMinDate());
  }, []);

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

  const handleSelectDeadline = () => {
    setIsDeadline(true);
  };

  const handleCancelDeadline = () => {
    setIsDeadline(false);
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = formatDate(selectedDate);
    setDeadlineValue(formattedDate);
    setIsDeadline(false);
    dispatch(updateDeadline({ name: task.name, deadline: formattedDate }));
  };

  return (
    <>
      <div draggable onDragStart={dragStart} onDragEnd={dragEnd}>
        {isEditing ? (
          <>
            <form onSubmit={handleSaveEditedCard}>
              <textarea
                className="card__textarea"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}></textarea>
              {/* <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              /> */}
              <button type="submit">save</button>
            </form>
          </>
        ) : (
          <>
            <div>
              {isSelectDeadline ? (
                <>
                  <form action="">
                    <input
                      type="date"
                      min={minDate}
                      value={deadlineValue ? formatDate(deadlineValue) : ""}
                      onChange={handleDateChange}
                    />
                    <button type="button" onClick={handleCancelDeadline}>
                      cancel
                    </button>
                  </form>
                </>
              ) : (
                <button onClick={handleSelectDeadline}>
                  {deadlineValue ? deadlineValue : "deadline"}
                </button>
              )}
            </div>

            <div className="card__wrapper">
              <p>{task.name}</p>
              <button onClick={handleEditCard}>edit</button>
              <button onClick={handleDeleteCard}>X</button>
            </div>
          </>
        )}
      </div>
      <div>Created {date}</div>
    </>
  );
};

export default TaskCard;
