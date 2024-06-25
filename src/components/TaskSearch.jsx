import React from "react";
import "../styles/TaskSearch.css";
import { IoIosSearch } from "react-icons/io";

const TaskSearch = () => {
  return (
    <div className="search__wrapper">
      <input className="search__input" type="text" placeholder="search" />
      <IoIosSearch className="search__icon" />
    </div>
  );
};

export default TaskSearch;
