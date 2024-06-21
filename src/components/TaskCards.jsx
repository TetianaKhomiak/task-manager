import React from "react";
import { useSelector } from "react-redux";
import "../styles/TaskCard.css";
import TaskCard from "./TaskCard";

const TaskCards = ({ columnName }) => {
  const tasks = useSelector((state) => state.tasksList.task);
  const filteredTasks = tasks.filter((task) => task.columnName === columnName);
  return (
    <div>
      {filteredTasks.map((task, index) => (
        <div key={index} className="task__wrapper">
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
};

export default TaskCards;
