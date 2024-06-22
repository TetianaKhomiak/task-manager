import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/TaskCard.css";
import TaskCard from "./TaskCard";
import DropAreaTask from "./DropAreaTask";
import { updateTasks } from "../redux/slices/tasksListSlice";

const TaskCards = ({ columnName }) => {
  const tasks = useSelector((state) => state.tasksList.task);
  const activeCard = useSelector((state) => state.tasksList.activeCard);
  const dispatch = useDispatch();

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

  return (
    <div>
      <DropAreaTask onDrop={() => onDrop(columnName, 0)} />
      {tasks &&
        tasks.map(
          (task, index) =>
            task.columnName === columnName && (
              <div key={index}>
                <div className="task__wrapper">
                  <TaskCard task={task} index={index} />
                </div>
                <DropAreaTask onDrop={() => onDrop(columnName, index + 1)} />
              </div>
            )
        )}
    </div>
  );
};

export default TaskCards;
