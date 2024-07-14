import React from "react";
import { FaRegCircleDot } from "react-icons/fa6";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../redux/slices/cardSlice";
import "../styles/ColorSelector.css";

const ColorSelector = ({ task }) => {
  const tasks = useSelector((state) => state.card.tasks);
  const dispatch = useDispatch();

  const selectedColor =
    tasks.find((item) => item.id === task.id)?.selectedColor || null;

  const handleColorChange = (color) => {
    dispatch(setColor({ id: task.id, selectedColor: color }));
  };

  return (
    <div className="color-changer">
      <div className="color-changer__container">
        <details>
          <summary>
            <span className="summary-title">Change Color </span>
            <div className="summary-chevron-up">
              <RiArrowDropDownLine className="icon" />
            </div>
          </summary>
          <div className="color-changer__wrapper ">
            <div className="summary-content">
              <div
                className="color-option"
                onClick={() => handleColorChange("#87B69D")}>
                <FaRegCircleDot
                  className={`circle-dot__gulf-stream ${
                    selectedColor === "#87B69D" ? "active" : ""
                  }`}
                />
              </div>
              <div
                className="color-option"
                onClick={() => handleColorChange("#ab91c7")}>
                <FaRegCircleDot
                  className={`circle-dot__smoky-grape ${
                    selectedColor === "#ab91c7" ? "active" : ""
                  }`}
                />
              </div>
              <div
                className="color-option"
                onClick={() => handleColorChange("#9ACDFC")}>
                <FaRegCircleDot
                  className={`circle-dot__sky-blue ${
                    selectedColor === "#9ACDFC" ? "active" : ""
                  }`}
                />
              </div>
              <div
                className="color-option"
                onClick={() => handleColorChange("#cdc5c5")}>
                <FaRegCircleDot
                  className={`circle-dot__pale-gray ${
                    selectedColor === "#cdc5c5" ? "active" : ""
                  }`}
                />
              </div>

              <div
                className="color-option"
                onClick={() => handleColorChange("#f8a9b2")}>
                <FaRegCircleDot
                  className={`circle-dot__pale-pink ${
                    selectedColor === "#f8a9b2" ? "active" : ""
                  }`}
                />
              </div>

              <div
                className="color-option"
                onClick={() => handleColorChange("#EAF68E")}>
                <FaRegCircleDot
                  className={`circle-dot__pale-chartreuse ${
                    selectedColor === "#EAF68E" ? "active" : ""
                  }`}
                />
              </div>
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

export default ColorSelector;
