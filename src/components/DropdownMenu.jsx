import React, { useEffect, useState } from "react";
import { GoMoveToEnd } from "react-icons/go";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDeadline,
  updateTaskDescription,
} from "../redux/slices/tasksListSlice";
import "../styles/DropdownMenu.css";
import ColorChanger from "./ColorChanger";
import DropdownMenuItem from "./DropdownMenuItem";
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
  setIsEditingDescription,
}) => {
  const [isMovingTask, setIsMovingTask] = useState(false);
  const [isDescriptionDeleteDisabled, setIsDescriptionDeleteDisabled] =
    useState(!task.description);
  const [isDescriptionAddDisabled, setIsDescriptionAddDisabled] = useState(
    task.description
  );

  const tasks = useSelector((state) => state.tasksList.task);
  const currentTask = tasks.find((item) => item.id === task.id);
  const currentColumn = currentTask ? currentTask.columnName : "";
  const columns = useSelector((state) => state.taskColumns.columns);
  const currentIndexColumn = columns.indexOf(currentColumn);

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
      dispatch(updateDeadline({ id: task.id, deadline: "" }));
    }
  };

  const handleAddDescription = () => {
    setIsEditingDescription(true);
    setIsDropdownMenu(false);
  };

  const handleDeleteDescription = () => {
    dispatch(updateTaskDescription({ id: task.id, description: "" }));
    setIsDropdownMenu(false);
  };

  const handleMoveTaskEnter = () => {
    setIsMovingTask(true);
  };

  const handleMoveTaskLeave = () => {
    setIsMovingTask(false);
  };

  return (
    <div
      // className="dropdown-menu"
      className={
        currentIndexColumn == 3 ? "dropdown-menu__last" : "dropdown-menu"
      }>
      <ColorChanger task={task} />
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
        {isMovingTask && (
          <SubDropdownMenu
            tasks={tasks}
            currentColumn={currentColumn}
            currentIndexColumn={currentIndexColumn}
            currentTask={currentTask}
            columns={columns}
          />
        )}
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
