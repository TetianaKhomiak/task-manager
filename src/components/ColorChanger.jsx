import React from "react";
import ColorIcon from "../assets/color.svg";

const ColorChanger = () => {
  return (
    <div className="dropdown-menu__item">
      <button className="dropdown-menu__btn">
        Change Color
        <img src={ColorIcon} alt="color-switch" />
      </button>
    </div>
  );
};

export default ColorChanger;
