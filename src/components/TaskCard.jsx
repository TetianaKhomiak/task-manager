import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useRef, useState } from "react";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, getMinDate, transformColor } from "../../utils";
import { deleteCard, updateDeadline } from "../redux/slices/cardSlice";
import "../styles/TaskCard.css";
import DropdownMenu from "./DropdownMenu";
import TaskEditDescription from "./TaskEditDescription";
import TaskEditName from "./TaskEditName";

const TaskCard = ({ task }) => {
  const tasks = useSelector((state) => state.card.tasks);
  const dispatch = useDispatch();
  const [isSelectDeadline, setIsDeadline] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isDropdownMenu, setIsDropdownMenu] = useState(false);
  const [hoveringButton, setHoveringButton] = useState(false); //

  const [deadlineValue, setDeadlineValue] = useState(task.deadline || "");
  const [isDeadlineDeleteDisabled, setIsDeadlineDeleteDisabled] = useState(
    !task.deadline
  );
  const [isDeadlineAddDisabled, setIsDeadlineAddDisabled] = useState(
    task.deadline
  );

  const selectedColor =
    tasks.find((item) => item.id === task.id)?.selectedColor || null;

  const transformedColor = transformColor(selectedColor);

  const dropdownRef = useRef(null);
  const deadlineRef = useRef(null);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "Task", task },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    userSelect: isDragging ? "none" : "auto",
  };

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
        setHoveringButton(false);
      }
      if (deadlineRef.current && !deadlineRef.current.contains(event.target)) {
        setIsDeadline(false);
        setHoveringButton(false);
      }
    };

    if (isDropdownMenu || isSelectDeadline) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownMenu, isSelectDeadline, dropdownRef, deadlineRef]);

  const handleSelectDeadline = () => {
    setIsDeadline(true);
    setHoveringButton(false);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const formattedDate = formatDate(selectedDate);
    setDeadlineValue(formattedDate);
    setIsDeadline(false);
    dispatch(updateDeadline({ id: task.id, deadline: formattedDate }));
    setIsDeadlineDeleteDisabled(false);
    setHoveringButton(false);
  };

  const handleDropdownMenu = () => {
    setIsDropdownMenu(true);
    setHoveringButton(false);
  };

  const handleDeleteCard = () => {
    dispatch(deleteCard(task.id));
    setHoveringButton(false);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...(isEditingDescription ||
      isEditingName ||
      isDropdownMenu ||
      hoveringButton
        ? {}
        : listeners)}
      style={style}
      className="card__listeners">
      <div
        className="card__container"
        style={{
          backgroundColor: transformedColor ? transformedColor : "#F5F6F8",
          cursor: isEditingDescription || isEditingName ? "auto" : "all-scroll",
        }}>
        <div>
          {isDropdownMenu && (
            <div
              className="card__overlay"
              onClick={() => setIsDropdownMenu(false)}></div>
          )}
          <div
            className="card__wrapper"
            style={{
              backgroundColor: selectedColor ? selectedColor : "#CDC5C5",
            }}>
            <TaskEditName
              task={task}
              isEditingName={isEditingName}
              setIsEditingName={setIsEditingName}
            />
            <div className="card__header_wrapper">
              <div ref={dropdownRef} className="card__dropdown-container">
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
                    setIsEditingDescription={setIsEditingDescription}
                  />
                ) : (
                  <button
                    type="button"
                    className="card__dots"
                    onClick={handleDropdownMenu}
                    onMouseEnter={() => setHoveringButton(true)}
                    onMouseLeave={() => setHoveringButton(false)}>
                    <IoEllipsisVerticalOutline />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <TaskEditDescription
          task={task}
          isEditingDescription={isEditingDescription}
          setIsEditingDescription={setIsEditingDescription}
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
              type="button"
              onClick={handleSelectDeadline}
              onMouseEnter={() => setHoveringButton(true)}
              onMouseLeave={() => setHoveringButton(false)}
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
    </div>
  );
};

export default TaskCard;
