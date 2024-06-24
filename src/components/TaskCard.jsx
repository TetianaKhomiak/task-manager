import React, { useEffect, useRef, useState } from "react";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { formatDate, getMinDate } from "../../utils";
import {
  deleteCard,
  setActiveCard,
  updateDeadline,
  updateTaskName,
  updateTaskDescription,
} from "../redux/slices/tasksListSlice";
import DropdownMenu from "./DropdownMenu";

const TaskCard = ({ task, index }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [leftCharacterLenght, setLeftCharacterLenght] = useState(20);

  const [isSelectDeadline, setIsDeadline] = useState(false);
  const [deadlineValue, setDeadlineValue] = useState(task.deadline || "");
  const [isDeadlineDeleteDisabled, setIsDeadlineDeleteDisabled] = useState(
    !task.deadline
  );
  const [isDeadlineAddDisabled, setIsDeadlineAddDisabled] = useState(
    task.deadline
  );

  const [isDropdownMenu, setIsDropdownMenu] = useState(false);

  const [minDate, setMinDate] = useState("");
  const date = formatDate(task.creationDate);

  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const deadlineRef = useRef(null);

  useEffect(() => {
    const updateTaskProp = () => {
      setEditedName(task.name);
      setEditedDescription(task.description);
      setDeadlineValue(task.deadline || "");
      setIsDeadlineDeleteDisabled(!task.deadline);
      setIsDeadlineAddDisabled(task.deadline);
    };
    updateTaskProp();
  }, [task]);

  useEffect(() => {
    const getDate = () => {
      setMinDate(getMinDate());
    };
    getDate();
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

    const addEvent = () => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    };
    addEvent();
  }, [dropdownRef, deadlineRef]);

  useEffect(() => {
    const setCharactersLengh = () => {
      setLeftCharacterLenght(20 - editedName.length);
    };
    setCharactersLengh();
  }, [editedName]);

  const dragStart = (e) => {
    dispatch(setActiveCard(index));
  };

  const dragEnd = () => {
    dispatch(setActiveCard(null));
  };

  const handleDeleteCard = () => {
    dispatch(deleteCard(task.name));
  };

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleSaveEditedName = (e) => {
    e.preventDefault();
    setIsEditingName(false);
    dispatch(updateTaskName({ name: task.name, editedTask: editedName }));
  };

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleSaveEditedDescription = (e) => {
    e.preventDefault();
    setIsEditingDescription(false);
    dispatch(
      updateTaskDescription({ name: task.name, description: editedDescription })
    );
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
      <div draggable onDragStart={dragStart} onDragEnd={dragEnd}>
        <div>
          {isDropdownMenu && (
            <div
              className="overlay"
              onClick={() => setIsDropdownMenu(false)}></div>
          )}
        </div>

        <div className="topper__wrapper">
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
                style={isDropdownMenu && !deadlineValue ? { opacity: 0 } : {}}>
                {/* to hide hover effect of deadline-btn */}
                {deadlineValue ? `deadline ${deadlineValue}` : "deadline"}
              </button>
            )}
          </div>
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
        </div>
        <>
          {isEditingName ? (
            <>
              <form onSubmit={handleSaveEditedName}>
                <textarea
                  className="card__textarea"
                  type="text"
                  maxLength={20}
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}></textarea>
                <p>{leftCharacterLenght}</p>
                <button type="submit">save</button>
              </form>
            </>
          ) : (
            <>
              <div className="card__name" onDoubleClick={handleEditName}>
                {task.name}
              </div>
            </>
          )}
        </>
        <>
          {isEditingDescription ? (
            <>
              <form onSubmit={handleSaveEditedDescription}>
                <textarea
                  className="card__textarea"
                  type="text"
                  value={editedDescription}
                  onChange={(e) =>
                    setEditedDescription(e.target.value)
                  }></textarea>
                <button type="submit">save</button>
              </form>
            </>
          ) : (
            <>
              <div
                className="card__descr"
                onDoubleClick={handleEditDescription}>
                {task.description}
              </div>
            </>
          )}
        </>
        <div className="card__created-date">Created {date}</div>
      </div>
    </>
  );
};

export default TaskCard;
