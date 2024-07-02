import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskDescription } from "../redux/slices/cardSlice";
import "../styles/TaskEditDescription.css";
import "../styles/TaskEditName.css"; //for style of .edit__textarea

const TaskEditDescription = ({
  task,
  isEditingDescription,
  setIsEditingDescription,
  editedDescription,
  setEditedDescription,
}) => {
  const selectedColor = useSelector((state) => {
    const currentTask = state.card.tasks.find((item) => item.id === task.id);
    return currentTask ? currentTask.selectedColor : null;
  });
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const buttonStyle = {
    backgroundColor: isHovered ? (selectedColor ? selectedColor : "") : "",
    transition: "background-color 0.3s ease",
  };
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

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

  useEffect(() => {
    // Reset isHovered when exiting edit mode
    if (!isEditingDescription) {
      setIsHovered(false);
    }
  }, [isEditingDescription]);

  useEffect(() => {
    const updateTaskProp = () => {
      setEditedDescription(task.description);
    };
    updateTaskProp();
  }, [task, setEditedDescription]);

  return (
    <div>
      {isEditingDescription ? (
        <>
          <form
            className="edit__form_descr"
            onSubmit={handleSaveEditedDescription}>
            <textarea
              className="edit__textarea edit__textarea_descr"
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}></textarea>
            <button
              className="edit__btn"
              type="submit"
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              SAVE
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="edit__descr" onDoubleClick={handleEditDescription}>
            <div className="edit__descr_text">{task.description}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskEditDescription;
