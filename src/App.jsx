import "./App.css";
import TaskSearch from "./components/TaskSearch";
import TaskBoard from "./components/TaskBoard";
import { useDispatch, useSelector } from "react-redux";
import { updateColumns } from "./redux/slices/columnSlice";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

function App() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.column.columns);
  const getColumnPos = (id) => columns.findIndex((column) => column.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;
    const originalPos = getColumnPos(active.id);
    const newPos = getColumnPos(over.id);

    const newColumns = arrayMove(columns, originalPos, newPos);

    dispatch(updateColumns(newColumns));
  };

  return (
    <>
      <TaskSearch />
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <TaskBoard />
      </DndContext>
    </>
  );
}

export default App;
