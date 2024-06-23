import React from "react";
import "../styles/DropdownMenu.css";
import { useDispatch } from "react-redux";
import { updateDeadline } from "../redux/slices/tasksListSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoMoveToEnd } from "react-icons/go";
import ColorIcon from "../assets/color.svg";

const DropdownMenu = ({
  setDeadlineValue,
  task,
  setIsDropdownMenu,
  deadlineValue,
  handleDeleteCard,
  isDeadlineButtonDisabled,
}) => {
  const dispatch = useDispatch();

  const handleDeleteDeadline = () => {
    if (deadlineValue) {
      setIsDropdownMenu(false);
      setDeadlineValue("");
      dispatch(updateDeadline({ name: task.name, deadline: "" }));
    }
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
      <button className="dropdown-menu__btn">
        Move to
        <GoMoveToEnd />
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
