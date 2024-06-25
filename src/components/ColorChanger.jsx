import React from "react";
import "../styles/ColorChanger.css";
import { FaRegCircleDot } from "react-icons/fa6";
import { setColor } from "../redux/slices/tasksListSlice";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

const ColorChanger = ({ task }) => {
  const dispatch = useDispatch();
  const selectedColor = useSelector((state) => {
    const task2 = state.tasksList.task.find((item) => item.id === task.id);
    return task2 ? task2.selectedColor : null;
  });

  const handleColorChange = (color) => {
    dispatch(setColor({ id: task.id, selectedColor: color }));
  };
  console.log(selectedColor);

  return (
    <div className="color-changer">
      <div className="dropdown-menu__item">
        <details className="dropdown-menu__details" type="button">
          <summary>
            <span class="summary-title">Change Color </span>
            <div class="summary-chevron-up">
              <RiArrowDropDownLine className="icon" />
            </div>
          </summary>
          <div className="color-changer__wrapper ">
            <div className="summary-content">
              <button
                className="color-option"
                onClick={() => handleColorChange("#87B69D")}>
                <FaRegCircleDot
                  className={`circle-dot__gulf-stream ${
                    selectedColor === "#87B69D" ? "active" : ""
                  }`}
                />
              </button>
              <button
                className="color-option"
                onClick={() => handleColorChange("#ab91c7")}>
                <FaRegCircleDot
                  className={`circle-dot__smoky-grape ${
                    selectedColor === "#ab91c7" ? "active" : ""
                  }`}
                />
              </button>
              <button
                className="color-option"
                onClick={() => handleColorChange("#96d0f2")}>
                <FaRegCircleDot
                  className={`circle-dot__sky-blue ${
                    selectedColor === "#96d0f2" ? "active" : ""
                  }`}
                />
              </button>
              <button
                className="color-option"
                onClick={() => handleColorChange("#cdc5c5")}>
                <FaRegCircleDot
                  className={`circle-dot__pale-gray ${
                    selectedColor === "#cdc5c5" ? "active" : ""
                  }`}
                />
              </button>

              <button
                className="color-option"
                onClick={() => handleColorChange("#f8a9b2")}>
                <FaRegCircleDot
                  className={`circle-dot__pale-pink ${
                    selectedColor === "#f8a9b2" ? "active" : ""
                  }`}
                />
              </button>

              <button
                className="color-option"
                onClick={() => handleColorChange("#EAF68E")}>
                <FaRegCircleDot
                  className={`circle-dot__pale-chartreuse ${
                    selectedColor === "#EAF68E" ? "active" : ""
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="summary-chevron-down">
            <RiArrowDropUpLine className="icon" />
          </div>
        </details>
      </div>
    </div>
  );
};

export default ColorChanger;
