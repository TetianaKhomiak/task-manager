import React, { useState } from "react";
import "../styles/TaskForm.css";
import { addTask } from "../redux/slices/tasksListSlice";
import { useDispatch } from "react-redux";

const TaskForm = ({ setIsAddingTask, columnName }) => {
  const [inputValue, setInputValue] = useState("");
  const [charCount, setCharCount] = useState(20);
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
    setCharCount(20);
    setIsAddingTask(false);
  };

  const handleCancel = () => {
    setIsAddingTask(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setCharCount(20 - e.target.value.length);
  };

  return (
    <div className="form__wrapper">
      <form className="form" onSubmit={handleSubmitForm}>
        <textarea
          maxLength={20}
          className="form__textarea"
          value={inputValue}
          onChange={handleInputChange}></textarea>
        <div className="char-count">Characters left: {charCount}</div>
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
