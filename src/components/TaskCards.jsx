import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/TaskCard.css";
import TaskCard from "./TaskCard";
import DropAreaTask from "./DropAreaTask";
import { updateTasks } from "../redux/slices/tasksListSlice";
import { useContext } from "react";
import { SearchContext } from "../context/SearchProvider";

const TaskCards = ({ columnName }) => {
  const tasks = useSelector((state) => state.tasksList.task);
  const activeCard = useSelector((state) => state.tasksList.activeCard);
  const dispatch = useDispatch();
  const { searchTask } = useContext(SearchContext);

  console.log(tasks);
  const onDrop = (category, position) => {
    console.log(
      `${activeCard} is going to place inot ${category} at the position ${position}`
    );
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

  const filteredTasks = searchTask
    ? tasks.filter(
        (task) =>
          task.name.includes(searchTask) && task.columnName === columnName
      )
    : tasks.filter((task) => task.columnName === columnName);

  return (
    <div>
      <DropAreaTask onDrop={() => onDrop(columnName, 0)} />
      {filteredTasks.map((task, index) => (
        <div key={index}>
          <TaskCard task={task} index={index} />
          <DropAreaTask onDrop={() => onDrop(columnName, index + 1)} />
        </div>
      ))}
    </div>
  );
};

export default TaskCards;
