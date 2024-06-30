import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import DropAreaCard from "./DropAreaCard";
import { updateTasks, dropCard } from "../redux/slices/cardSlice";
import { useContext } from "react";
import { SearchContext } from "../context/SearchProvider";

const TaskCards = ({ columnName }) => {
  const tasks = useSelector((state) => state.card.tasks);
  const dispatch = useDispatch();
  const { searchTask } = useContext(SearchContext);

  const onDrop = (category, position) => {
    dispatch(dropCard({ category, position }));
  };

  const filteredTasks = tasks
    .map((task, index) => ({ ...task, originalIndex: index }))
    .filter((task) => task.name.includes(searchTask));

  return (
    <div>
      <DropAreaCard onDrop={() => onDrop(columnName, 0)} />
      {filteredTasks
        .filter((task) => task.columnName === columnName)
        .map((task, index) => (
          <div key={task.originalIndex}>
            <TaskCard task={task} index={task.originalIndex} />
            <DropAreaCard onDrop={() => onDrop(columnName, index + 1)} />
          </div>
        ))}
    </div>
  );
};

export default TaskCards;
