import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { SearchContext } from "../context/SearchProvider";
import TaskCard from "./TaskCard";

const TaskCards = ({ columnName }) => {
  const tasks = useSelector((state) => state.card.tasks);
  const { searchTask } = useContext(SearchContext);

  const filteredTasks = tasks
    .map((task, index) => ({ ...task, originalIndex: index }))
    .filter((task) => task.name?.includes(searchTask ?? ""));

  return (
    <div>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {filteredTasks
          .filter((task) => task.columnName === columnName)
          .map((task) => (
            <div key={task.id}>
              <TaskCard task={task} />
            </div>
          ))}
      </SortableContext>
    </div>
  );
};

export default TaskCards;
