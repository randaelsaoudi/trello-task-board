import React, { useEffect } from "react";
import { useTasks } from "../../../context/TasksContext";

const SearchFilter = () => {
  const { updateSearchFilter, searchText, setSearchText } = useTasks();

  useEffect(() => {
    let id = setTimeout(() => {
      updateSearchFilter(searchText);
    }, 300);

    return () => clearTimeout(id);
  }, [searchText]);

  return (
    <label className="w-1/4 ">
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="search"
        className="px-2 py-2 rounded-md border shadow-sm text-sm w-full  outline-none"
        placeholder="Search for task, assignee, type..."
      />
    </label>
  );
};

export default SearchFilter;