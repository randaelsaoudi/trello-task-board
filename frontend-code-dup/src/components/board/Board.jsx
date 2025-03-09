import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { useTasks } from "../../context/TasksContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { move, reorder } from "../../utils/dndFunctions";
import { AiOutlinePlus } from "react-icons/ai";
import Task from "./Task";
import SeverityFilter from "./Filters/SeverityFilter";
import StartDateFilter from "./Filters/StartDateFilter";
import EndDateFilter from "./Filters/EndDateFilter";
import ClearFilters from "./Filters/ClearFilters";
import SearchFilter from "./Filters/SearchFilter";
import AssigneeFilter from "./Filters/AssigneeFilter";
import Loader from "../loaders/Loader";

const Board = () => {
  const { tasksList, boardColumns, tasksData, setTasksData, isLoading } =
    useTasks();
  const [columns, setColumns] = useState({});

  useEffect(() => {
    setColumns(boardColumns);

    return () => setColumns({});
  }, [tasksList, boardColumns]);

  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = source.droppableId;
    const dInd = destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(
        columns[sInd].items,
        source.index,
        destination.index
      );
      const newState = { ...columns };
      newState[sInd].items = items;
      setColumns(newState);
    } else {
      const { result, removed } = move(
        columns[sInd].items,
        columns[dInd].items,
        source,
        destination
      );

      const newState = { ...columns };
      newState[sInd].items = result[sInd];
      newState[dInd].items = result[dInd];

      setTasksData(
        tasksData.map((data) => (data.id === removed.id ? removed : data))
      );
    }
  }

  return (
    <div className="md:w-full lg:w-[90vw] min-w-full  bg-gray-100 dark__mode dark:bg-[#232323]">
      <Header />
      <div className="w-full mt-4 px-5">
        <div className="flex flex-col w-full gap-6 p-2 min-h-screen">
          <fieldset className="flex gap-4 py-3 flex-wrap border border-gray-300 px-8">
            <legend className="text-gray-400 font-semibold px-2">
              Filters
            </legend>
            <SearchFilter />
            <SeverityFilter />
            <AssigneeFilter />
            <StartDateFilter />
            <EndDateFilter />
            <ClearFilters />
          </fieldset>
          {isLoading ? (
            <div>
              <Loader loading={isLoading} />
            </div>
          ) : (
            <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full">
              <DragDropContext onDragEnd={onDragEnd} className="w-full ">
                {Object.entries(columns).map(([columnKey, columnTasks]) => (
                  <div key={columnKey} className="sm:w-1/3 md:w-1/4">
                    <h1
                      className={`text-sm text-neutral-600 uppercase font-semibold border-b-2 p-1 ${columnTasks.color} dark__mode dark:text-gray-200 flex items-center gap-1`}
                    >
                      {columnTasks.title}{" "}
                      <span className="text-xs text-neutral-400 dark:text-neutral-300 dark__mode">
                        ({columnTasks.items?.length})
                      </span>
                    </h1>
                    <Droppable droppableId={`${columnKey}`}>
                      {(provided) => (
                        <div
                          ref={provided?.innerRef}
                          {...provided?.droppableProps}
                          className=" flex flex-col gap-2 m-3"
                        >
                          {columnTasks?.items?.map((task, index) => (
                            <Task task={task} key={task.id} index={index} />
                          ))}
                          <div className="shadow-sm rounded-sm py-4 px-5 text-sm font-semibold bg-white text-emerald-500 flex  items-center  gap-2 cursor-not-allowed transition">
                            <AiOutlinePlus />
                            <span> Add Task</span>
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </DragDropContext>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
