import React, { useEffect, useRef, useState } from "react";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, getMinDate, transformColor } from "../../utils";
import {
  deleteCard,
  setActiveCard,
  updateDeadline,
} from "../redux/slices/tasksListSlice";
import DropdownMenu from "./DropdownMenu";
import TaskEdit from "./TaskEdit";

const TaskCard = ({ task, index }) => {
  const [isSelectDeadline, setIsDeadline] = useState(false);
  const [deadlineValue, setDeadlineValue] = useState(task.deadline || "");
  const [isDeadlineDeleteDisabled, setIsDeadlineDeleteDisabled] = useState(
    !task.deadline
  );
  const [isDeadlineAddDisabled, setIsDeadlineAddDisabled] = useState(
    task.deadline
  );

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const [isDropdownMenu, setIsDropdownMenu] = useState(false);

  const [minDate, setMinDate] = useState("");
  const date = formatDate(task.creationDate);
  const selectedColor = useSelector((state) => {
    const task2 = state.tasksList.task.find((item) => item.name === task.name);
    return task2 ? task2.selectedColor : null;
  });
  const transformedColor = transformColor(selectedColor);

  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const deadlineRef = useRef(null);

  useEffect(() => {
    const updateTaskProp = () => {
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
    <div
      className="task__wrapper"
      style={{
        backgroundColor: transformedColor ? transformedColor : "inherit",
      }}>
      <div
        draggable
        onDragStart={() => dispatch(setActiveCard(index))}
        onDragEnd={() => dispatch(setActiveCard(null))}>
        <div>
          {isDropdownMenu && (
            <div
              className="overlay"
              onClick={() => setIsDropdownMenu(false)}></div>
          )}
        </div>

        <div
          className="topper__wrapper"
          style={{
            backgroundColor: selectedColor ? selectedColor : "inherit",
          }}>
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
                handleDeleteCard={() => dispatch(deleteCard(task.name))}
                isDeadlineDeleteDisabled={isDeadlineDeleteDisabled}
                isDeadlineAddDisabled={isDeadlineAddDisabled}
                handleSelectDeadline={handleSelectDeadline}
                setIsEditingDescription={setIsEditingDescription}
              />
            ) : (
              <IoEllipsisVerticalOutline
                className="card__dots"
                onClick={handleDropdownMenu}
              />
            )}
          </div>
        </div>
        <TaskEdit
          task={task}
          isEditingDescription={isEditingDescription}
          setIsEditingDescription={setIsEditingDescription}
          editedDescription={editedDescription}
          setEditedDescription={setEditedDescription}
        />
        <div className="card__created-date">Created {date}</div>
      </div>
    </div>
  );
};

export default TaskCard;
