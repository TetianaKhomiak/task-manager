import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { formatDate, getMinDate } from "../../utils";
import {
  deleteCard,
  setActiveCard,
  updateDeadline,
  updateTask,
} from "../redux/slices/tasksListSlice";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import DropdownMenu from "./DropdownMenu";

const TaskCard = ({ task, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSelectDeadline, setIsDeadline] = useState(false);
  const [isDropdownMenu, setIsDropdownMenu] = useState(false);
  const [inputValue, setInputValue] = useState(task.name);
  const [minDate, setMinDate] = useState("");
  const date = formatDate(task.creationDate);
  const [deadlineValue, setDeadlineValue] = useState(task.deadline || "");

  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setInputValue(task.name);
  }, [task.name]);

  useEffect(() => {
    setMinDate(getMinDate());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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
    const selectedDate = e.target.value;
    const formattedDate = formatDate(selectedDate);
    setDeadlineValue(formattedDate);
    setIsDeadline(false);
    dispatch(updateDeadline({ name: task.name, deadline: formattedDate }));
  };

  const handleDropdownMenu = () => {
    setIsDropdownMenu(!isDropdownMenu);
  };

  return (
    <>
      <div ref={dropdownRef}>
        {isDropdownMenu ? (
          <DropdownMenu />
        ) : (
          <PiDotsSixVerticalBold
            className="card__dots"
            onClick={handleDropdownMenu}
          />
        )}
      </div>

      <div draggable onDragStart={dragStart} onDragEnd={dragEnd}>
        {isEditing ? (
          <>
            <form onSubmit={handleSaveEditedCard}>
              <textarea
                className="card__textarea"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}></textarea>
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
                      value={deadlineValue}
                      onChange={handleDateChange}
                    />
                    <button type="button" onClick={handleCancelDeadline}>
                      cancel
                    </button>
                  </form>
                </>
              ) : (
                <button onClick={handleSelectDeadline}>
                  {deadlineValue ? `deadline ${deadlineValue}` : "deadline"}
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
