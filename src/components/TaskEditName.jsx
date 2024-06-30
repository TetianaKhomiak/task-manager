import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { transformColor } from "../../utils";
import { updateTaskName } from "../redux/slices/cardSlice";
import "../styles/TaskEditName.css";

const TaskEditName = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const [leftCharacterLenght, setLeftCharacterLenght] = useState(30);
  const selectedColor = useSelector((state) => {
    const currentTask = state.card.tasks.find((item) => item.id === task.id);
    return currentTask ? currentTask.selectedColor : null;
  });
  const transformedColor = transformColor(selectedColor);

  const [isError, setIsError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    backgroundColor: isHovered
      ? transformedColor
        ? transformedColor
        : "#F5F6F8"
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
      setLeftCharacterLenght(30 - editedName.length);
    };
    setCharactersLengh();
  }, [editedName]);

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleSaveEditedName = (e) => {
    e.preventDefault();

    if (editedName === "") {
      setIsError(true);
    } else {
      setIsEditingName(false);
      dispatch(updateTaskName({ id: task.id, editedTask: editedName }));
    }
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
                placeholder={isError ? "Title is required" : ""}
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
              Remaining Characters: <bold> {leftCharacterLenght}</bold>
            </p>
          </>
        ) : (
          <>
            <div
              className="edit__name"
              onDoubleClick={handleEditName}
              style={{
                backgroundColor: selectedColor ? selectedColor : "#CDC5C5",
              }}>
              <div className="edit__name_text">{task.name}</div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default TaskEditName;
