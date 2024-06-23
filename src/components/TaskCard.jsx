import React, { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { formatDate, getMinDate } from "../../utils";
import {
  deleteCard,
  setActiveCard,
  updateDeadline,
  updateTask,
} from "../redux/slices/tasksListSlice";
import DropdownMenu from "./DropdownMenu";

const TaskCard = ({ task, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSelectDeadline, setIsDeadline] = useState(false);
  const [isDropdownMenu, setIsDropdownMenu] = useState(false);
  const [isDeadlineDeleteDisabled, setIsDeadlineDeleteDisabled] = useState(
    !task.deadline
  );
  const [isDeadlineAddDisabled, setIsDeadlineAddDisabled] = useState(
    task.deadline
  );
  const [inputValue, setInputValue] = useState(task.name);
  const [minDate, setMinDate] = useState("");
  const date = formatDate(task.creationDate);
  const [deadlineValue, setDeadlineValue] = useState(task.deadline || "");
  const [leftCharacterLenght, setLeftCharacterLenght] = useState(20);

  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const deadlineRef = useRef(null);

  useEffect(() => {
    setInputValue(task.name);
    setDeadlineValue(task.deadline || "");
    setIsDeadlineDeleteDisabled(!task.deadline);
    setIsDeadlineAddDisabled(task.deadline);
  }, [task]);

  useEffect(() => {
    setMinDate(getMinDate());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownMenu(false);
      }
      if (deadlineRef.current && !deadlineRef.current.contains(event.target)) {
        setIsDeadline(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, deadlineRef]);

  useEffect(() => {
    setLeftCharacterLenght(20 - inputValue.length);
  }, [inputValue]);

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

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const formattedDate = formatDate(selectedDate);
    setDeadlineValue(formattedDate);
    setIsDeadline(false);
    dispatch(updateDeadline({ name: task.name, deadline: formattedDate }));
    setIsDeadlineDeleteDisabled(false);
  };

  const handleDropdownMenu = () => {
    setIsDropdownMenu(!isDropdownMenu);
  };

  return (
    <>
      {isDropdownMenu && (
        <div className="overlay" onClick={() => setIsDropdownMenu(false)}></div>
      )}
      <div ref={dropdownRef} className="dropdown-container">
        {isDropdownMenu ? (
          <DropdownMenu
            setDeadlineValue={setDeadlineValue}
            task={task}
            setIsDropdownMenu={setIsDropdownMenu}
            deadlineValue={deadlineValue}
            handleDeleteCard={handleDeleteCard}
            isDeadlineDeleteDisabled={isDeadlineDeleteDisabled}
            isDeadlineAddDisabled={isDeadlineAddDisabled}
            handleSelectDeadline={handleSelectDeadline}
          />
        ) : (
          <IoEllipsisVerticalOutline
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
                maxLength={20}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}></textarea>
              <p>{leftCharacterLenght}</p>
              <button type="submit">save</button>
            </form>
          </>
        ) : (
          <>
            <div className="card__wrapper">
              <div className="card__header">
                <p className="card__title">{task.name}</p>
                <button className="card__btn_edit" onClick={handleEditCard}>
                  <CiEdit />
                </button>
              </div>
              <div>
                {isSelectDeadline ? (
                  <input
                    ref={deadlineRef}
                    type="date"
                    min={minDate}
                    value={deadlineValue}
                    onChange={handleDateChange}
                  />
                ) : (
                  <button
                    onClick={handleSelectDeadline}
                    className={
                      deadlineValue
                        ? "card__deadline-btn_show"
                        : "card__deadline-btn_hide"
                    }
                    style={
                      isDropdownMenu && !deadlineValue ? { opacity: 0 } : {}
                    }>
                    {/* to hide hover effect of deadline-btn */}
                    {deadlineValue ? `deadline ${deadlineValue}` : "deadline"}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="card__created-date">Created {date}</div>
    </>
  );
};

export default TaskCard;
