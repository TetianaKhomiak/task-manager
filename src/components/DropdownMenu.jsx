import React, { useState } from "react";
import "../styles/DropdownMenu.css";
import { useDispatch } from "react-redux";
import { updateDeadline } from "../redux/slices/tasksListSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoMoveToEnd } from "react-icons/go";
import ColorIcon from "../assets/color.svg";
import SubDropdownMenu from "./SubDropdownMenu";

const DropdownMenu = ({
  setDeadlineValue,
  task,
  setIsDropdownMenu,
  deadlineValue,
  handleDeleteCard,
  isDeadlineButtonDisabled,
}) => {
  const [isMovingTask, setIsMovingTask] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteDeadline = () => {
    if (deadlineValue) {
      setIsDropdownMenu(false);
      setDeadlineValue("");
      dispatch(updateDeadline({ name: task.name, deadline: "" }));
    }
  };

  const handleMoveTaskEnter = () => {
    setIsMovingTask(true);
  };

  const handleMoveTaskLeave = () => {
    setIsMovingTask(false);
  };
  return (
    <div className="dropdown-menu">
      <button className="dropdown-menu__btn">
        <img src={ColorIcon} alt="color-switch" />
        Change Color
      </button>
      <button
        className="dropdown-menu__btn"
        disabled={isDeadlineButtonDisabled}
        onClick={handleDeleteDeadline}
        style={isDeadlineButtonDisabled ? { opacity: 0.4 } : {}}>
        <RiDeleteBinLine className="delete__icon" />
        Delete Deadline
      </button>
      <button
        className="dropdown-menu__btn_move"
        onMouseEnter={handleMoveTaskEnter}
        onMouseLeave={handleMoveTaskLeave}>
        Move to
        <GoMoveToEnd />
        {isMovingTask && <SubDropdownMenu />}
      </button>
      <button
        className="dropdown-menu__btn dropdown-menu__btn_red"
        onClick={handleDeleteCard}>
        <RiDeleteBinLine className="delete__icon" /> <span>Delete Task</span>
      </button>
    </div>
  );
};

export default DropdownMenu;
