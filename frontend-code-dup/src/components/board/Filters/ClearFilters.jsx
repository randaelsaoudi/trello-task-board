import React from "react";
import { useTasks } from "../../../context/TasksContext";

const ClearFilters = () => {
  const { clearFilters } = useTasks();
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={clearFilters}
        className="px-4 h-8  rounded-full flex items-center justify-center text-white bg-blue-500 text-sm"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ClearFilters;