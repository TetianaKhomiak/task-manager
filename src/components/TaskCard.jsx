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
import TaskEditDescription from "./TaskEditDescription";

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

  const selectedColor = useSelector((state) => {
    const currentTask = state.tasksList.task.find(
      (item) => item.id === task.id
    );
    return currentTask ? currentTask.selectedColor : null;
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
    dispatch(updateDeadline({ id: task.id, deadline: formattedDate }));
    setIsDeadlineDeleteDisabled(false);
  };

  const handleDropdownMenu = () => {
    setIsDropdownMenu(!isDropdownMenu);
  };

  return (
    <div
      className="task__wrapper"
      style={{
        backgroundColor: transformedColor ? transformedColor : "#F5F6F8",
      }}>
      <div
        draggable
        onDragStart={() => dispatch(setActiveCard(index))}
        onDragEnd={() => dispatch(setActiveCard(null))}>
        {isDropdownMenu && (
          <div
            className="overlay"
            onClick={() => setIsDropdownMenu(false)}></div>
        )}

        <div
          className="card__wrapper"
          style={{
            backgroundColor: selectedColor ? selectedColor : "#CDC5C5",
          }}>
          <TaskEdit task={task} />
          <div className="card__header_wrapper">
            <div ref={dropdownRef} className="dropdown-container">
              {isDropdownMenu ? (
                <DropdownMenu
                  setDeadlineValue={setDeadlineValue}
                  task={task}
                  setIsDropdownMenu={setIsDropdownMenu}
                  deadlineValue={deadlineValue}
                  handleDeleteCard={() => dispatch(deleteCard(task.id))}
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
        </div>
      </div>
      <TaskEditDescription
        task={task}
        isEditingDescription={isEditingDescription}
        setIsEditingDescription={setIsEditingDescription}
        editedDescription={editedDescription}
        setEditedDescription={setEditedDescription}
      />
      <div className="card__deadline_wrapper">
        {isSelectDeadline ? (
          <div className="card__input_wrapper">
            <input
              ref={deadlineRef}
              type="date"
              min={getMinDate()}
              value={deadlineValue}
              onChange={handleDateChange}
              className="card__deadline_input"
              style={{ backgroundColor: task.selectedColor }}
            />
          </div>
        ) : (
          <button
            onClick={handleSelectDeadline}
            className={
              deadlineValue
                ? "card__deadline-btn_show"
                : "card__deadline-btn_hide"
            }
            style={{
              ...(isDropdownMenu && !deadlineValue ? { opacity: 0 } : {}),
              backgroundColor: task.selectedColor,
            }}>
            {deadlineValue ? `deadline ${deadlineValue}` : "deadline"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
