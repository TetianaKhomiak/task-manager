import React, { useState, useEffect } from "react";
import {
  updateTaskName,
  updateTaskDescription,
} from "../redux/slices/tasksListSlice";
import { useDispatch, useSelector } from "react-redux";

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
    const task2 = state.tasksList.task.find((item) => item.name === task.name);
    return task2 ? task2.selectedColor : null;
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
    dispatch(updateTaskName({ name: task.name, editedTask: editedName }));
  };

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleSaveEditedDescription = (e) => {
    e.preventDefault();
    setIsEditingDescription(false);
    dispatch(
      updateTaskDescription({ name: task.name, description: editedDescription })
    );
  };

  return (
    <div>
      <>
        {isEditingName ? (
          <>
            <form onSubmit={handleSaveEditedName}>
              <textarea
                className="card__textarea"
                type="text"
                maxLength={20}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}></textarea>
              <p>{leftCharacterLenght}</p>
              <button type="submit">save</button>
            </form>
          </>
        ) : (
          <>
            <div
              className="card__name"
              onDoubleClick={handleEditName}
              style={{
                backgroundColor: selectedColor ? selectedColor : "inherit",
              }}>
              <div className="card__name_text">{task.name}</div>
            </div>
          </>
        )}
      </>
      <>
        {isEditingDescription ? (
          <>
            <form onSubmit={handleSaveEditedDescription}>
              <textarea
                className="card__textarea"
                type="text"
                value={editedDescription}
                onChange={(e) =>
                  setEditedDescription(e.target.value)
                }></textarea>
              <button type="submit">save</button>
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
