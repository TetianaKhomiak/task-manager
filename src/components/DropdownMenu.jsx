import React, { useState } from "react";
import "../styles/DropdownMenu.css";
import { useDispatch } from "react-redux";
import { updateDeadline } from "../redux/slices/tasksListSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoMoveToEnd } from "react-icons/go";
import ColorIcon from "../assets/color.svg";
import { IoIosAddCircleOutline } from "react-icons/io";
import SubDropdownMenu from "./SubDropdownMenu";

const DropdownMenu = ({
  setDeadlineValue,
  task,
  setIsDropdownMenu,
  deadlineValue,
  handleDeleteCard,
  isDeadlineDeleteDisabled,
  isDeadlineAddDisabled,
  handleSelectDeadline,
}) => {
  const [isMovingTask, setIsMovingTask] = useState(false);
  const dispatch = useDispatch();

  const handleAddDeadline = () => {
    setIsDropdownMenu(false);
    handleSelectDeadline();
  };

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
      <div className="dropdown-menu__item">
        <button className="dropdown-menu__btn">
          Change Color
          <img src={ColorIcon} alt="color-switch" />
        </button>
      </div>
      <div className="dropdown-menu__item">
        <button
          className="dropdown-menu__btn"
          disabled={isDeadlineAddDisabled}
          onClick={handleAddDeadline}
          style={isDeadlineAddDisabled ? { opacity: 0.4 } : {}}>
          Add Deadline
          <IoIosAddCircleOutline />
        </button>
      </div>
      <div className="dropdown-menu__item">
        <button
          className="dropdown-menu__btn"
          disabled={isDeadlineDeleteDisabled}
          onClick={handleDeleteDeadline}
          style={isDeadlineDeleteDisabled ? { opacity: 0.4 } : {}}>
          Delete Deadline
          <RiDeleteBinLine className="delete__icon" />
        </button>
      </div>
      <div
        className="dropdown-menu__item"
        onMouseEnter={handleMoveTaskEnter}
        onMouseLeave={handleMoveTaskLeave}>
        <div className="dropdown-menu__btn_move">
          Move to
          <GoMoveToEnd />
        </div>
        {isMovingTask && <SubDropdownMenu />}
      </div>
      <div className="dropdown-menu__item">
        <button
          className="dropdown-menu__btn dropdown-menu__btn_red"
          onClick={handleDeleteCard}>
          <span>Delete Task</span>
          <RiDeleteBinLine className="delete__icon" />
        </button>
      </div>
    </div>
  );
};

export default DropdownMenu;
