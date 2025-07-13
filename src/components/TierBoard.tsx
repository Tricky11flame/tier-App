// the parent component of our whole kanban board hihi haha :3
// import PlusIcon from "../icons/PlusIcon";
import {  useMemo, useState } from "react";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import defaultCols from "../constants/defaultCols";
import defaultTasks from "../constants/defaultTask";
// import axios from "axios";
// import PokeIcon from "../icons/PokeIcon";
// import "../../public/2.png"
// IMP imports from dnd kit
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
// IMP imports from sortable
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

// this is  new  for me wow :
// import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import TheVoid from "./TheVoid";
import SaveBttn from "./SaveBttn";
import CreateBttn from "./CreateBttn";


// default data start ...

// default data end ...

function TierBoard() {

  // const kekw = colFetching();
  // useEffect(()=>{
  //   axios.get('')
  //   .then((res)=>{
  //     // the response handling kekw
  //   })
  //   .catch((err)=>{
  //     // error handling :C
  //   })
  //   .then((err)=>{
  //     // permanently runs
  //   })
  // ,[]
  // // dependency array : epmty =>?  so that i runs only one time kekw
  // })

  // imposing the type
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  // wtf is this??
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  // null or typeA ... intersting
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // gotta read this up from DOX
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div
      className="mx-auto my-10 flex"
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto ">
          <div className="flex flex-col gap-1">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                col.id!="thevoid"&&
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  deleteTask={deleteTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
            
            <TheVoid
              column={{
                id: "thevoid",
                title: "THE VOID",
                color: "red",
              }}
              deleteTask={deleteTask}
              tasks={tasks.filter((task) => task.columnId === "thevoid")}
              />
          </div>

          <SaveBttn createNewColumn = {createNewColumn} />
          <CreateBttn saveData = {saveData} />
          
        </div>

        


          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                deleteTask={deleteTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
              />
            )}
          </DragOverlay>
      </DndContext>
    </div>
  );

  // function createTask2(columnId: Id) {
  //   const newTask: Task = {
  //     id: generateId(),
  //     columnId,
  //     content: `Task ${tasks.length + 1}`,
  //   };

  //   setTasks([...tasks, newTask]);
  // }


  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
      color:"rose"
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id: Id, title: string) {
    
    // const newColumns=columns.map((col)=>{
    //   if (col.id !== "thevoid") {
    //     if (col.id !== id) return col;
    //     return { ...col, title };
    //   };
    // });
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    // newColumns.pop();
    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

function saveData(){
  console.log("data saved")
  return;
}
export default TierBoard;
