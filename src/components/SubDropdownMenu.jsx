import React, { useEffect, useState } from "react";
import "../styles/SubDropdownMenu.css";
import { useSelector } from "react-redux";

const SubDropdownMenu = ({ task }) => {
  const column = useSelector((state) => {
    const currentTask = state.tasksList.task.find(
      (item) => item.id === task.id
    );
    return currentTask ? currentTask.columnName : "";
  });

  const buttonsText = ["To Do", "In Progress", "On Hold", "Completed"];

  return (
    <div className="subdropdown-menu">
      {buttonsText.map((buttonText) => (
        <button
          key={buttonText}
          disabled={buttonText === column}
          className="subdropdown-menu__btn"
          style={buttonText === column ? { opacity: 0.4 } : {}}>
          {buttonText}
        </button>
      ))}
    </div>
  );
};

export default SubDropdownMenu;
