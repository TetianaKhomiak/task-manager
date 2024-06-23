import React from "react";
import "../styles/DropdownMenu.css";
import { useDispatch } from "react-redux";
import { updateDeadline } from "../redux/slices/tasksListSlice";

const DropdownMenu = ({ setDeadlineValue, task, setIsDropdownMenu }) => {
  const dispatch = useDispatch();

  const handleDeleteDeadline = () => {
    setIsDropdownMenu(false);
    setDeadlineValue("");
    dispatch(updateDeadline({ name: task.name, deadline: "" }));
  };

  return (
    <div className="dropdown-menu">
      <p>Change Color</p>
      <p onClick={handleDeleteDeadline}>Delete Deadline</p>
      <p>Move to</p>
      <p>Delete Task</p>
    </div>
  );
};

export default DropdownMenu;
