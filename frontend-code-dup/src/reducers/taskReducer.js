import { ActionTypes } from "./constants";

export const initialState = {
  tasksList: [],
  searchValue: "",
  filters: {
    theme: "light",
    severity: "all",
    startDate: "",
    endDate: "",
    assignee: "all",
  },
};

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_TASKS:
      return {
        ...state,
        tasksList: action.payload,
      };
    case ActionTypes.UPDATE_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload,
      };
    case ActionTypes.UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filterType]: action.payload.filterValue,
        },
      };
    case ActionTypes.UPDATE_SEARCH_FILTER:
      return {
        ...state,
        searchValue: action.payload,
      };
    case ActionTypes.CLEAR_FILTERS:
      return {
        ...state,
        searchValue: "",
        filters: {
          ...state.filters,
          severity: "all",
          assignee: "all",
          startDate: "",
          endDate: "",
        },
      };
    default:
      break;
  }
};