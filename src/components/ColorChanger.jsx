import React, { useState } from "react";
import ColorIcon from "../assets/color.svg";
import "../styles/ColorChanger.css";
import { FaRegCircleDot } from "react-icons/fa6";

const ColorChanger = () => {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorChange = (color) => {
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
          onClick={() => handleColorChange("color1")}>
          <FaRegCircleDot
            className={`circle-dot__gulf-stream ${
              selectedColor === "color1" ? "active" : ""
            }`}
          />
        </button>
        <button
          className="color-option"
          onClick={() => handleColorChange("color2")}>
          <FaRegCircleDot
            className={`circle-dot__smoky-grape ${
              selectedColor === "color2" ? "active" : ""
            }`}
          />
        </button>
        <button
          className="color-option"
          onClick={() => handleColorChange("color3")}>
          <FaRegCircleDot
            className={`circle-dot__bright-cerulean ${
              selectedColor === "color3" ? "active" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ColorChanger;
