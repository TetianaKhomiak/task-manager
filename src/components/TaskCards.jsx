import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "../context/SearchProvider";
import { dropCard } from "../redux/slices/cardSlice";
import DropAreaCard from "./DropAreaCard";
import TaskCard from "./TaskCard";

const TaskCards = ({ columnName, idColumn }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.card.tasks);
  const { searchTask } = useContext(SearchContext);

  const onDrop = (category, position) => {
    dispatch(dropCard({ category, position }));
  };

  const filteredTasks = tasks
    .map((task, index) => ({ ...task, originalIndex: index }))
    .filter((task) => task.name?.includes(searchTask ?? ""));
  console.log(filteredTasks);

  return (
    <div>
      <DropAreaCard onDrop={() => onDrop(columnName, 0)} />
      {filteredTasks
        .filter((task) => task.columnName === columnName)
        .map((task, index) => (
          <div key={task.id}>
            <TaskCard
              task={task}
              index={task.originalIndex}
              idColumn={idColumn}
            />
            <DropAreaCard onDrop={() => onDrop(columnName, index + 1)} />
          </div>
        ))}
    </div>
  );
};

export default TaskCards;
