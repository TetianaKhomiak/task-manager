import React, { useEffect, useState } from "react";
import "../styles/EditTask.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskDescription } from "../redux/slices/tasksListSlice";

const TaskEditDescription = ({
  task,
  isEditingDescription,
  setIsEditingDescription,
  editedDescription,
  setEditedDescription,
}) => {
  const selectedColor = useSelector((state) => {
    const currentTask = state.tasksList.task.find(
      (item) => item.id === task.id
    );
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
          <div className="card__descr" onDoubleClick={handleEditDescription}>
            <div className="card__descr_text">{task.description}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskEditDescription;
