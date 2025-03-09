import React, { createContext, useContext, useEffect, useReducer, useMemo, useState, useCallback } from "react";
import { initialState, tasksReducer } from "../reducers/taskReducer";
import { getTasksService } from "../utils/services/services";
import { ActionTypes } from "../reducers/constants";
import { filterFunction } from "../utils/filterFunctions/filterFunctions";

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const [tasksData, setTasksData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getTasksService();
      console.log({ response });
      if (response?.status === 200) {
        dispatch({
          type: ActionTypes.UPDATE_TASKS,
          payload: response?.data ?? [],
        });
        setTasksData(response?.data);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const updateTasks = useCallback((updateTasks) => {
    dispatch({
      type: ActionTypes.UPDATE_TASKS,
      payload: updateTasks,
    });
  }, []);

  useEffect(() => {
    updateTasks(state?.tasksList);
  }, [state?.tasksList, updateTasks]);

  const updateFilters = useCallback((filterType, filterValue) => {
    dispatch({
      type: ActionTypes.UPDATE_FILTERS,
      payload: { filterType, filterValue },
    });
  }, []);

  const updateSearchFilter = useCallback((searchText) => {
    dispatch({
      type: ActionTypes.UPDATE_SEARCH_FILTER,
      payload: searchText,
    });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({
      type: ActionTypes.CLEAR_FILTERS,
    });
    setSearchText("");
  }, []);

  const filteredTasks = useMemo(() => filterFunction(state), [state]);

  const tasks = useMemo(
    () =>
      filteredTasks?.reduce(
        (acc, curr) => {
          if (curr?.status === "Ready") {
            return { ...acc, readyTasks: [...acc.readyTasks, curr] };
          } else if (curr?.status === "In Progress") {
            return { ...acc, inProgressTasks: [...acc.inProgressTasks, curr] };
          } else if (curr?.status === "Testing") {
            return { ...acc, testingTasks: [...acc.testingTasks, curr] };
          } else if (curr?.status === "Done") {
            return { ...acc, doneTasks: [...acc.doneTasks, curr] };
          }
          return acc;
        },
        { readyTasks: [], inProgressTasks: [], testingTasks: [], doneTasks: [] }
      ),
    [filteredTasks]
  );

  const boardColumns = useMemo(
    () => ({
      Ready: {
        title: "Resources",
        items: tasks?.readyTasks,
        color: "border-gray-400",
      },
      "In Progress": {
        title: "Todo",
        items: tasks?.inProgressTasks,
        color: "border-yellow-400",
      },
      Testing: {
        title: "Doing",
        items: tasks?.testingTasks,
        color: "border-sky-400",
      },
      Done: {
        title: "Done",
        items: tasks?.doneTasks,
        color: "border-green-400",
      },
    }),
    [tasks]
  );

  return (
    <TasksContext.Provider
      value={{
        tasksList: state.tasksList,
        filters: state.filters,
        boardColumns,
        tasksData,
        setTasksData,
        updateFilters,
        clearFilters,
        updateSearchFilter,
        searchText,
        setSearchText,
        isLoading,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

const useTasks = () => useContext(TasksContext);

export { useTasks };
export default TasksProvider;
