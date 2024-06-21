import React, { useState } from "react";
import TaskColumn from "./TaskColumn";
import "../styles/TaskBoard.css";

const TaskBoard = () => {
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [taskColumnList, setTaskColumnList] = useState(["awaiting"]);
  const [selectValue, setSelectValue] = useState("To Do");

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
      setSelectValue("To do");
      setIsAddingColumn(false);
    }
  };

  const handleCancel = () => {
    setIsAddingColumn(false);
    setSelectValue("To Do");
  };

  return (
    <div className="board__wrapper">
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
              />
            </div>
          </React.Fragment>
        ))}
      {isAddingColumn ? (
        <>
          <form onSubmit={handleAddTaskColumn}>
            <select
              name="category"
              onChange={handleSelectChange}
              value={selectValue}>
              <option value="To Do">To Do</option>
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
          <button onClick={handleAddColumn}>+</button>
        )
      )}
    </div>
  );
};

export default TaskBoard;
