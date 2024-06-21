import React, { useState } from "react";
import TaskColumn from "./TaskColumn";
import "../styles/TaskBoard.css";
import DropAreaTaskColumn from "./DropAreaTaskColumn";

const TaskBoard = () => {
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [taskColumnList, setTaskColumnList] = useState(["To do"]);
  const [selectValue, setSelectValue] = useState("In Progress");
  const [activeCard, setActiveCard] = useState(null);

  const handleAddColumn = () => {
    setIsAddingColumn(true);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const handleAddTaskColumn = (e) => {
    e.preventDefault();
    if (selectValue) {
      setTaskColumnList([...taskColumnList, selectValue]);
      setSelectValue("In Progress");
      setIsAddingColumn(false);
    }
  };

  const handleCancel = () => {
    setIsAddingColumn(false);
    setSelectValue("In Progress");
  };

  const onDrop = (position) => {
    if (activeCard == null || activeCard === undefined) {
      return;
    }
    const taskToMove = taskColumnList[activeCard];
    const updatedTasks = taskColumnList.filter(
      (_, index) => index !== activeCard
    );
    updatedTasks.splice(position, 0, taskToMove);
    setTaskColumnList(updatedTasks);
  };

  return (
    <div className="board__wrapper">
      <DropAreaTaskColumn onDrop={() => onDrop(0)} />
      {taskColumnList &&
        taskColumnList.length > 0 &&
        taskColumnList.map((item, index) => (
          <React.Fragment key={index}>
            <div>
              <TaskColumn
                title={item}
                columnIndex={index}
                taskColumnList={taskColumnList}
                setTaskColumnList={setTaskColumnList}
                setActiveCard={setActiveCard}
                index={index}
              />
            </div>
            <DropAreaTaskColumn onDrop={() => onDrop(index + 1)} />
          </React.Fragment>
        ))}
      {isAddingColumn ? (
        <>
          <form onSubmit={handleAddTaskColumn}>
            <select
              name="category"
              onChange={handleSelectChange}
              value={selectValue}>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>

            <button type="submit">add</button>
            <button type="button" onClick={handleCancel}>
              cancel
            </button>
          </form>
        </>
      ) : (
        taskColumnList.length < 4 && (
          <button onClick={handleAddColumn} className="board__btn_add-column">
            + add new category
          </button>
        )
      )}
    </div>
  );
};

export default TaskBoard;
