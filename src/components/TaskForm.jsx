import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slices/cardSlice";
import "../styles/TaskForm.css";
import { v4 as uuidv4 } from "uuid";

const TaskForm = ({ setIsAddingTask, columnName }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [charCount, setCharCount] = useState(30);
  const [isError, setIsError] = useState(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (taskName === "") {
      setIsError(true);
    } else {
      setIsError(false);
      dispatch(
        addTask({
          name: taskName,
          id: uuidv4(),
          description: taskDescription,
          columnName,
          deadline: null,
          selectedColor: "#CDC5C5",
        })
      );

      setTaskName("");
      setTaskDescription("");
      setCharCount(30);
      setIsAddingTask(false);
    }
  };

  const handleCancel = () => {
    setIsAddingTask(false);
  };

  const handleNameChange = (e) => {
    setTaskName(e.target.value);
    setCharCount(30 - e.target.value.length);
    setIsError(e.target.value === "");
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  return (
    <div className="form__wrapper">
      <form className="form" onSubmit={handleSubmitForm}>
        <textarea
          maxLength={30}
          className="form__textarea"
          value={taskName}
          placeholder={isError ? "Title is required" : "Title"}
          onChange={handleNameChange}></textarea>
        <div className="form__char-count">Characters left: {charCount}</div>
        <textarea
          className="form__textarea form__textarea_big"
          value={taskDescription}
          placeholder="Description"
          onChange={handleDescriptionChange}></textarea>
        <div className="form__btn_wrapper">
          <button className="form__btn" type="submit">
            Add
          </button>
          <button className="form__btn" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
