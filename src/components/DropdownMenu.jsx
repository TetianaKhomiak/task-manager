import React, { useState, useEffect } from "react";
import "../styles/DropdownMenu.css";
import { useDispatch } from "react-redux";
import { updateDeadline } from "../redux/slices/tasksListSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoMoveToEnd } from "react-icons/go";
import ColorIcon from "../assets/color.svg";
import { IoIosAddCircleOutline } from "react-icons/io";
import SubDropdownMenu from "./SubDropdownMenu";
import { updateTaskDescription } from "../redux/slices/tasksListSlice";
import DropdownMenuItem from "./DropdownMenuItem";

const DropdownMenu = ({
  setDeadlineValue,
  task,
  setIsDropdownMenu,
  deadlineValue,
  handleDeleteCard,
  isDeadlineDeleteDisabled,
  isDeadlineAddDisabled,
  handleSelectDeadline,
  setIsEditingDescription,
}) => {
  const [isMovingTask, setIsMovingTask] = useState(false);
  const [isDescriptionDeleteDisabled, setIsDescriptionDeleteDisabled] =
    useState(!task.description);
  const [isDescriptionAddDisabled, setIsDescriptionAddDisabled] = useState(
    task.description
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const updateTaskProp = () => {
      setIsDescriptionDeleteDisabled(!task.description);
      setIsDescriptionAddDisabled(task.description);
    };
    updateTaskProp();
  }, [task]);

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

  const handleAddDescription = () => {
    setIsEditingDescription(true);
    setIsDropdownMenu(false);
  };

  const handleDeleteDescription = () => {
    dispatch(updateTaskDescription({ name: task.name, description: "" }));
    setIsDropdownMenu(false);
  };

  const handleMoveTaskEnter = () => {
    setIsMovingTask(true);
  };

  const handleMoveTaskLeave = () => {
    setIsMovingTask(false);
  };

  return (
    <div className="dropdown-menu">
      <DropdownMenuItem className="dropdown-menu__btn">
        Change Color
        <img src={ColorIcon} alt="color-switch" />
      </DropdownMenuItem>
      <DropdownMenuItem
        className="dropdown-menu__btn"
        disabled={isDeadlineAddDisabled}
        onClick={handleAddDeadline}
        style={isDeadlineAddDisabled ? { opacity: 0.4 } : {}}>
        Add Deadline
        <IoIosAddCircleOutline />
      </DropdownMenuItem>

      <DropdownMenuItem
        className="dropdown-menu__btn"
        disabled={isDeadlineDeleteDisabled}
        onClick={handleDeleteDeadline}
        style={isDeadlineDeleteDisabled ? { opacity: 0.4 } : {}}>
        Delete Deadline
        <RiDeleteBinLine className="delete__icon" />
      </DropdownMenuItem>

      <DropdownMenuItem
        className="dropdown-menu__btn"
        disabled={isDescriptionAddDisabled}
        onClick={handleAddDescription}
        style={isDescriptionAddDisabled ? { opacity: 0.4 } : {}}>
        Add Description
        <IoIosAddCircleOutline />
      </DropdownMenuItem>

      <DropdownMenuItem
        className="dropdown-menu__btn"
        disabled={isDescriptionDeleteDisabled}
        onClick={handleDeleteDescription}
        style={isDescriptionDeleteDisabled ? { opacity: 0.4 } : {}}>
        Delete Description
        <RiDeleteBinLine className="delete__icon" />
      </DropdownMenuItem>

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

      <DropdownMenuItem
        className="dropdown-menu__btn dropdown-menu__btn_red"
        onClick={handleDeleteCard}>
        <span>Delete Task</span>
        <RiDeleteBinLine className="delete__icon" />
      </DropdownMenuItem>
    </div>
  );
};

export default DropdownMenu;
