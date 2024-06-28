import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskCard from "./TaskCard";
import DropAreaCard from "./DropAreaCard";
import { updateTasks } from "../redux/slices/cardSlice";
import { useContext } from "react";
import { SearchContext } from "../context/SearchProvider";

const TaskCards = ({ columnName }) => {
  const tasks = useSelector((state) => state.card.task);
  const activeCard = useSelector((state) => state.card.activeCard);
  const dispatch = useDispatch();
  const { searchTask } = useContext(SearchContext);

  console.log(tasks);
  const onDrop = (category, position) => {
    // console.log(
    //   `${activeCard} is going to place inot ${category} at the position ${position}`
    // );
    if (activeCard == null || activeCard === undefined) {
      return;
    }
    const taskToMove = tasks[activeCard];
    const updatedTasks = tasks.filter((task, index) => index !== activeCard);
    updatedTasks.splice(position, 0, {
      ...taskToMove,
      columnName: category,
    });
    dispatch(updateTasks(updatedTasks));
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
