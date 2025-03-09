const filterFunction = (state) => {
  const {
    searchValue,
    filters: { severity, assignee, startDate: start, endDate: end },
  } = state;
  let newTasksData = state?.tasksList;
  const lowerCaseSearchValue = searchValue;
  newTasksData =
    severity === "all"
      ? newTasksData
      : newTasksData.filter(({ priority }) => priority === severity);
  newTasksData =
    assignee === "all"
      ? newTasksData
      : newTasksData.filter(({ assignee: assig }) => assig === assignee);

  newTasksData =
    start.length > 0
      ? newTasksData.filter(
          ({ startDate }) => new Date(startDate) >= new Date(start)
        )
      : newTasksData;
  newTasksData =
    end.length > 0
      ? newTasksData.filter(({ endDate }) => new Date(endDate) <= new Date(end))
      : newTasksData;

  newTasksData =
    searchValue.length > 0
      ? newTasksData.filter(({ name, assignee, type }) => {
          return (
            name.toLowerCase().includes(lowerCaseSearchValue) ||
            assignee.toLowerCase().includes(lowerCaseSearchValue) ||
            type.toLowerCase().includes(lowerCaseSearchValue)
          );
        })
      : newTasksData;
  return newTasksData;
};

export { filterFunction };