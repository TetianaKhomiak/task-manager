import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div>
      <p>{task.name}</p>
    </div>
  );
};

export default TaskCard;
