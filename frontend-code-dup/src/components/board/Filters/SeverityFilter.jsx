import React from "react";
import { useTasks } from "../../../context/TasksContext";

const SeverityFilter = () => {
  const {
    updateFilters,
    filters: { severity },
  } = useTasks();

  const severityFilterHandler = (e) => {
    updateFilters(e.target.name, e.target.value);
  };
  return (
    <select
      value={severity}
      name="severity"
      onChange={severityFilterHandler}
      className="text-sm text-gray-700 outline-none border rounded-md px-2 py-2 bg-white"
    >
      <option value="all" disabled selected className="text-xs">
        Select Severity
      </option>
      <option value="all" className="text-xs">
        All
      </option>
      <option value="Low" className="text-xs">
        Low
      </option>
      <option value="Medium" className="text-xs">
        Medium
      </option>
      <option value="High" className="text-xs">
        High
      </option>
    </select>
  );
};

export default SeverityFilter;