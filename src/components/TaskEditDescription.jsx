import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskDescription } from "../redux/slices/cardSlice";
import "../styles/TaskEditDescription.css";
import Tiptap from "./Tiptap";

const TaskEditDescription = ({
  task,
  isEditingDescription,
  setIsEditingDescription,
}) => {
  const tasks = useSelector((state) => state.card.tasks);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const selectedColor =
    tasks.find((item) => item.id === task.id)?.selectedColor || null;

  const buttonStyle = {
    backgroundColor: isHovered ? (selectedColor ? selectedColor : "") : "",
    transition: "background-color 0.3s ease",
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleEditDescription = () => {
    setIsEditingDescription(true);
    //clear text selection - because after double click the text in Tiptap is selected
    window.getSelection().removeAllRanges();
  };

  const handleMouseDown = (event) => {
    //prevent selection of text in edit__descr while doubleclick
    event.preventDefault();
  };

  const handleEditorContent = (html) => {
    dispatch(updateTaskDescription({ id: task.id, description: html }));
  };

  useEffect(() => {
    // reset isHovered when exiting edit mode
    if (!isEditingDescription) {
      setIsHovered(false);
    }
  }, [isEditingDescription]);

  return (
    <div>
      {isEditingDescription ? (
        <>
          <div className="edit__wrapper_descr">
            <Tiptap onEditorContentSave={handleEditorContent} task={task} />
            <button
              className="edit__btn"
              type="button"
              style={buttonStyle}
              onClick={() => setIsEditingDescription(false)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              SAVE
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            className="edit__descr"
            onMouseDown={handleMouseDown}
            onDoubleClick={handleEditDescription}>
            <div className="edit__descr_text">
              {task.description ? parse(task.description) : ""}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskEditDescription;
