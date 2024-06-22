import React, { useState } from "react";
import "../styles/TaskForm.css";
import { addTask } from "../redux/slices/tasksListSlice";
import { useDispatch } from "react-redux";

const TaskForm = ({ setIsAddingTask, columnName }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(
      addTask({
        name: inputValue,
        columnName,
        creationDate: new Date().toISOString(),
        deadline: null,
      })
    );
    setInputValue("");
    setIsAddingTask(false);
  };

  const handleCancel = () => {
    setIsAddingTask(false);
  };

  return (
    <div className="form__wrapper">
      <form className="form" onSubmit={handleSubmitForm}>
        <textarea
          className="form__textarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}></textarea>
        <div>
          <button type="submit">Add</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
