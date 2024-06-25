import React, { useState } from "react";
import ColorIcon from "../assets/color.svg";
import "../styles/ColorChanger.css";
import { FaRegCircleDot } from "react-icons/fa6";

const ColorChanger = ({ selectedColor, setSelectedColor }) => {
  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedColor(color);
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
          onClick={() => handleColorChange("#0e87cc")}>
          <FaRegCircleDot
            className={`circle-dot__bright-cerulean ${
              selectedColor === "#0e87cc" ? "active" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ColorChanger;
