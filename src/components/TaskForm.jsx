import React from "react";
import "../styles/TaskForm.css";

const TaskForm = ({ setIsAddingTask }) => {
  const handleCancel = () => {
    setIsAddingTask(false);
  };
  return (
    <div>
      <form>
        <textarea name="" id=""></textarea>
        <button>add</button>
        <button onClick={handleCancel}>cancel</button>
      </form>
    </div>
  );
};

export default TaskForm;
