import React from "react";
import { useTasks } from "../../../context/TasksContext";

const EndDateFilter = () => {
  const {
    filters: { endDate },
    updateFilters,
  } = useTasks();
  return (
    <div>
      <label className="text-md text-gray-700  border rounded-md px-1 py-1 flex items-center justify-center bg-white">
        <input
          type="date"
          name="endDate"
          className="outline-none"
          value={endDate}
          onChange={(e) => updateFilters("endDate", e.target.value)}
        />
      </label>
    </div>
  );
};

export default EndDateFilter;