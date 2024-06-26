import React, { useEffect, useState } from "react";
import "../styles/SubDropdownMenu.css";
import { useSelector } from "react-redux";

const SubDropdownMenu = ({ task }) => {
  const [disabledButtons, setDisabledButtons] = useState({
    "To Do": false,
    "In Progress": false,
    "On Hold": false,
    Completed: false,
  });

  const column = useSelector((state) => {
    const task2 = state.tasksList.task.find((item) => item.id === task.id);
    return task2 ? task2.columnName : "";
  });

  useEffect(() => {
    const buttonTexts = ["To Do", "In Progress", "On Hold", "Completed"];
    const updatedDisabledButtons = buttonTexts.reduce((acc, buttonText) => {
      acc[buttonText] = buttonText === column;
      return acc;
    }, {});
    setDisabledButtons(updatedDisabledButtons);
  }, [column]);

  return (
    <div className="subdropdown-menu">
      {Object.keys(disabledButtons).map((buttonText) => (
        <button
          key={buttonText}
          disabled={disabledButtons[buttonText]}
          className="subdropdown-menu__btn"
          style={disabledButtons[buttonText] ? { opacity: 0.4 } : {}}>
          {buttonText}
        </button>
      ))}
    </div>
  );
};

export default SubDropdownMenu;
