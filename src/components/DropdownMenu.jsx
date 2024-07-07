import React, { useEffect, useState } from "react";
import { GoMoveToEnd } from "react-icons/go";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDeadline,
  updateTaskDescription,
} from "../redux/slices/cardSlice";
import "../styles/DropdownMenu.css";
import ColorSelector from "./ColorSelector";
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
  idColumn,
}) => {
  const tasks = useSelector((state) => state.card.tasks);
  const currentTask = tasks.find((item) => item.id === task.id);
  const columns = useSelector((state) => state.column.columns);
  const currentColumnName = currentTask ? currentTask.columnName : "";
  const dispatch = useDispatch();

  const [isMovingTask, setIsMovingTask] = useState(false);
  const [isDescriptionDeleteDisabled, setIsDescriptionDeleteDisabled] =
    useState(!task.description);
  const [isDescriptionAddDisabled, setIsDescriptionAddDisabled] = useState(
    task.description
  );

  const currentIndexColumn = columns.findIndex(
    (column) => column.name === currentColumnName
  );

  console.log(currentIndexColumn);

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
      className={
        currentIndexColumn === 3 ? "dropdown-menu__last" : "dropdown-menu"
      }>
      <ColorSelector task={task} />
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
        onMouseEnter={handleMoveTaskEnter}
        onMouseLeave={handleMoveTaskLeave}>
        <div className="dropdown-menu__btn_move">
          Move to
          <GoMoveToEnd />
        </div>
        {isMovingTask && (
          <SubDropdownMenu
            tasks={tasks}
            currentColumnName={currentColumnName}
            currentIndexColumn={currentIndexColumn}
            currentTask={currentTask}
            idColumn={idColumn}
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
