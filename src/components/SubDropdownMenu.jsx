import React from "react";
import "../styles/SubDropdownMenu.css";

const SubDropdownMenu = () => {
  return (
    <div className="subdropdown-menu">
      <button className="subdropdown-menu__btn">To do</button>
      <button className="subdropdown-menu__btn">In Progress</button>
      <button className="subdropdown-menu__btn">On Hold</button>
      <button className="subdropdown-menu__btn">Completed</button>
    </div>
  );
};

export default SubDropdownMenu;
