import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transformColor } from "../../utils";
import { updateTaskName } from "../redux/slices/tasksListSlice";
import "../styles/EditTask.css";

const TaskEdit = ({ task }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const [leftCharacterLenght, setLeftCharacterLenght] = useState(30);
  const selectedColor = useSelector((state) => {
    const currentTask = state.tasksList.task.find(
      (item) => item.id === task.id
    );
    return currentTask ? currentTask.selectedColor : null;
  });
  const transformedColor = transformColor(selectedColor);
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);
  const buttonStyle = {
    backgroundColor: isHovered
      ? transformedColor
        ? transformedColor
        : ""
      : "",
    transition: "background-color 0.3s ease",
  };
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const updateTaskProp = () => {
      setEditedName(task.name);
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

  return (
    <div className="edit__wrapper">
      <>
        {isEditingName ? (
          <>
            <form className="edit__form_name" onSubmit={handleSaveEditedName}>
              <textarea
                className="edit__textarea"
                type="text"
                maxLength={30}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}></textarea>
              <button
                className="edit__btn_name"
                type="submit"
                style={buttonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
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
    </div>
  );
};

export default TaskEdit;
