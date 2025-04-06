import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
// import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";
// import { createPortal } from "react-dom";

//prop to root component i guess :3
interface Props {
  column: Column;
  // function definition
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  deleteTask: (id: Id) => void;

  // arr of Task type
  tasks: Task[];
}


// lets take a look at the props being passed down from parent :3
function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  tasks,
  deleteTask,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  // const [ create, setCreate] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  let colourEx="bg-rose-100 bg-rose-500 bg-red-100 bg-red-500 bg-orange-100 bg-orange-500 bg-yellow-100 bg-yellow-500 bg-green-100 bg-green-500 bg-blue-100 bg-blue-500 bg-blue-100 bg-blue-500 bg-indigo-100 bg-indigo-500 bg-violet-100 bg-violet-500 bg-grey-100 bg-grey-500 bg-pink-100 bg-pink-500";
  colourEx+=" lol";
  // kinda like destructuring useSortable 
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  //special case for isDraging = True; 
  if (isDragging) {
    return (
      <div
        title={`${column.id}`}
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor
        opacity-40 border-[3px] border-pink-500
        rounded-md flex min-h-[120px] " >
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-${column.color}-100  border-[3px]   border-white
    rounded-md   flex  w-[1200px]  min-h-[120px] `}>
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        
        className={` bg-${column.color}-500  text-md  min-h-full cursor-grab
        p-4 font-bold rounded-l-sm  
        flex items-center justify-between border-r-black border-r-[5px] `}>
        <div className="flex ">
          <div onClick={() => {
          setEditMode(true);
        }} >

        
          {!editMode && <div className="rounded outline-none">
            {column.title}
          </div>}
          {editMode && (
            <input
            size={2}
              className="bg-black focus:border-rose-500 
              border rounded outline-none "
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(!editMode);
              }}
            />
          )}
        
        </div>
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="stroke-gray-500
        hover:stroke-white hover:bg-columnBackgroundColor
        rounded px-1 py-2 ">
          <TrashIcon />
        </button>
      </div>

      {/* Column task container */}
      <div className="flex flex-grow  gap-1 p-1 
      overflow-x-auto overflow-y-hidden">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;
