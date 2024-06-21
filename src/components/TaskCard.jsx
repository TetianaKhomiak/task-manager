import React from "react";
import { useSelector } from "react-redux";
import "../styles/TaskCard.css";

const TaskCard = ({ columnName }) => {
  const tasks = useSelector((state) => state.tasksList.task);
  const filteredTasks = tasks.filter((task) => task.columnName === columnName);
  return (
    <div>
      {filteredTasks.map((task, index) => (
        <p key={index} className="task__wrapper">
          {task.name}
        </p>
      ))}
    </div>
  );
};

export default TaskCard;
