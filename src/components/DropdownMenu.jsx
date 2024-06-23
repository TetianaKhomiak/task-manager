import React, { useState } from "react";
import "../styles/DropdownMenu.css";
import { useDispatch } from "react-redux";
import { updateDeadline } from "../redux/slices/tasksListSlice";

const DropdownMenu = ({
  setDeadlineValue,
  task,
  setIsDropdownMenu,
  deadlineValue,
}) => {
  const [isDisbaled, setIsDisabled] = useState(false);
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
      <p>Change Color</p>
      <button disabled={isDisbaled} onClick={handleDeleteDeadline}>
        Delete Deadline
      </button>
      <p>Move to</p>
      <p>Delete Task</p>
    </div>
  );
};

export default DropdownMenu;
