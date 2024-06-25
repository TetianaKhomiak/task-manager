import React, { useState } from "react";
import ColorIcon from "../assets/color.svg";
import "../styles/ColorChanger.css";
import { FaRegCircleDot } from "react-icons/fa6";
import { setColor } from "../redux/slices/tasksListSlice";
import { useDispatch, useSelector } from "react-redux";

const ColorChanger = ({ task }) => {
  const dispatch = useDispatch();
  const selectedColor = useSelector((state) => {
    const task2 = state.tasksList.task.find((item) => item.name === task.name);
    return task2 ? task2.selectedColor : null;
  });

  const handleColorChange = (color) => {
    dispatch(setColor({ name: task.name, selectedColor: color }));
  };
  console.log(selectedColor);

  return (
    <div className="color-changer">
      <div className="dropdown-menu__item">
        <button className="dropdown-menu__btn" type="button">
          Change Color
          <img src={ColorIcon} alt="color-switch" />
        </button>
      </div>

      <div className="color-changer__radio">
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
          onClick={() => handleColorChange("#675180")}>
          <FaRegCircleDot
            className={`circle-dot__smoky-grape ${
              selectedColor === "#675180" ? "active" : ""
            }`}
          />
        </button>
        <button
          className="color-option"
          onClick={() => handleColorChange("#72c7f8")}>
          <FaRegCircleDot
            className={`circle-dot__sky-blue ${
              selectedColor === "#72c7f8" ? "active" : ""
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
          onClick={() => handleColorChange("#32B67A")}>
          <FaRegCircleDot
            className={`circle-dot__sea-green ${
              selectedColor === "#32B67A" ? "active" : ""
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
  );
};

export default ColorChanger;
