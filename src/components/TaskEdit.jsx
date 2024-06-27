import React, { useState, useEffect } from "react";
import {
  updateTaskName,
  updateTaskDescription,
} from "../redux/slices/tasksListSlice";
import { useDispatch, useSelector } from "react-redux";
import "../styles/EditTask.css";

const TaskEdit = ({
  task,
  isEditingDescription,
  setIsEditingDescription,
  editedDescription,
  setEditedDescription,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const [leftCharacterLenght, setLeftCharacterLenght] = useState(20);
  const selectedColor = useSelector((state) => {
    const currentTask = state.tasksList.task.find(
      (item) => item.id === task.id
    );
    return currentTask ? currentTask.selectedColor : null;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const updateTaskProp = () => {
      setEditedName(task.name);
      setEditedDescription(task.description);
    };
    updateTaskProp();
  }, [task]);

  useEffect(() => {
    const setCharactersLengh = () => {
      setLeftCharacterLenght(20 - editedName.length);
    };
    setCharactersLengh();
  }, [editedName]);

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleSaveEditedName = (e) => {
    e.preventDefault();
    setIsEditingName(false);
    dispatch(updateTaskName({ id: task.id, editedTask: editedName }));
  };

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleSaveEditedDescription = (e) => {
    e.preventDefault();
    setIsEditingDescription(false);
    dispatch(
      updateTaskDescription({ id: task.id, description: editedDescription })
    );
  };

  return (
    <div className="edit__wrapper">
      <>
        {isEditingName ? (
          <>
            <form className="edit__form_name" onSubmit={handleSaveEditedName}>
              <textarea
                className="edit__textarea"
                type="text"
                maxLength={20}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}></textarea>
              <button className="edit__btn" type="submit">
                SAVE
              </button>
            </form>
            <p className="edit__char-counter">
              Remaining Characters: {leftCharacterLenght}
            </p>
          </>
        ) : (
          <>
            <div
              className="card__name"
              onDoubleClick={handleEditName}
              style={{
                backgroundColor: selectedColor ? selectedColor : "#CDC5C5",
              }}>
              <div className="card__name_text">{task.name}</div>
            </div>
          </>
        )}
      </>
      <>
        {isEditingDescription ? (
          <>
            <form
              className="edit__form_descr"
              onSubmit={handleSaveEditedDescription}>
              <textarea
                className="edit__textarea edit__textarea_descr"
                type="text"
                value={editedDescription}
                onChange={(e) =>
                  setEditedDescription(e.target.value)
                }></textarea>
              <button className="edit__btn" type="submit">
                SAVE
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="card__descr" onDoubleClick={handleEditDescription}>
              <div className="card__descr_text">{task.description}</div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default TaskEdit;
