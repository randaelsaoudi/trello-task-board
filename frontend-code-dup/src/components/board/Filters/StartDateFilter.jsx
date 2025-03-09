import React from "react";
import { useTasks } from "../../../context/TasksContext";

const StartDateFilter = () => {
  const {
    filters: { startDate },
    updateFilters,
  } = useTasks();

  return (
    <label className="text-md text-gray-700  border rounded-md px-1 py-1 flex items-center justify-center bg-white">
      <input
        type="date"
        className="outline-none"
        value={startDate}
        name="startDate"
        onChange={(e) => updateFilters(e.target.name, e.target.value)}
      />
    </label>
  );
};

export default StartDateFilter;