import React from "react";
import { useTasks } from "../../../context/TasksContext";

const AssigneeFilter = () => {
  const {
    tasksData,
    updateFilters,
    filters: { assignee },
  } = useTasks();

  const assigneeFilterHandler = (e) => {
    updateFilters(e.target.name, e.target.value);
  };
  const assigneesList = [...new Set(tasksData?.map((task) => task.assignee))].filter(Boolean);

  return (
    <select
      value={assignee}
      name="assignee"
      onChange={assigneeFilterHandler}
      className="text-sm text-gray-700 outline-none border rounded-md px-2 py-2 bg-white"
    >
      <option value="all" disabled selected className="text-xs">
        Select Assignee
      </option>
      <option value="all">
        All
      </option>
      {assigneesList?.map((assignee) => {
        return (
          <option value={assignee} className="text-xs">
            {assignee}
          </option>
        );
      })}
      {/* <option value="all" className="text-xs">
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
    </option> */}
    </select>
  );
};

export default AssigneeFilter;