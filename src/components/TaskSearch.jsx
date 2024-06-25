import React from "react";
import "../styles/TaskSearch.css";
import { IoIosSearch } from "react-icons/io";
import { useContext } from "react";
import { SearchContext } from "../context/SearchProvider";

const TaskSearch = () => {
  const { searchTask, setSearchTask } = useContext(SearchContext);

  // console.log(searchTask);

  const onChangeSearch = (e) => {
    setSearchTask(e.target.value);
  };

  return (
    <div className="search__wrapper">
      <input
        className="search__input"
        type="text"
        placeholder="search"
        value={searchTask}
        onChange={onChangeSearch}
      />
      <IoIosSearch className="search__icon" />
    </div>
  );
};

export default TaskSearch;
