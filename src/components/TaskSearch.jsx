import React, { useContext } from "react";
import { IoIosSearch } from "react-icons/io";
import { SearchContext } from "../context/SearchProvider";
import "../styles/TaskSearch.css";

const TaskSearch = () => {
  const { searchTask, setSearchTask } = useContext(SearchContext);

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
