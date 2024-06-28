import React, { useEffect } from "react";
import "../styles/EditTask.css";
import { useDispatch } from "react-redux";
import { updateTaskDescription } from "../redux/slices/tasksListSlice";

const TaskEditDescription = ({
  task,
  isEditingDescription,
  setIsEditingDescription,
  editedDescription,
  setEditedDescription,
}) => {
  const dispatch = useDispatch();

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
    </div>
  );
};

export default TaskEditDescription;
