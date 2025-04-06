import {  SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
// import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";
// import { createPortal } from "react-dom";

//prop to root component i guess :3
interface Props {
  column: Column;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}


// lets take a look at the props being passed down from parent :3
function TheVoid({
  column,
  tasks,
  deleteTask,
}: Props) {
  // const [ create, setCreate] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  // kinda like destructuring useSortable 
  const {
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    }
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      title="TheVoid"
      ref={setNodeRef}
      style={style}
      className="bg-gray-100 
      rounded-md  flex w-full border-[3px] border-white"
    >
      {/* Column title */}
      <div
        title = "Col Title"
        className={` bg-gray-500  text-md  min-h-full cursor-grab p-4 font-bold rounded-l-sm  border-black border-[5px] flex items-center justify-between`}
      >
        <div className="flex ">
          <div className="rounded outline-none">
            {column.title}
          </div>        
        </div>
        
      </div>

      {/* Column task container */}
      <div 
        title = " Task Container "
        className="flex flex-grow  gap-1 p-1 
        overflow-x-auto overflow-y-hidden"
      >
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

export default TheVoid;
