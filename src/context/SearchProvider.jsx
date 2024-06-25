import React from "react";
import { createContext, useState } from "react";

export const SearchContext = createContext(null);

const SearchProvider = ({ children }) => {
  const [searchTask, setSearchTask] = useState("");

  const searchValues = {
    searchTask,
    setSearchTask,
  };
  return (
    <SearchContext.Provider value={searchValues}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
