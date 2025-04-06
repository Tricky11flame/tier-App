import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Task } from "../types";
// hmm intersting useSortable :3
import { useSortable } from "@dnd-kit/sortable";
// h,,, css from utilities 
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
}

function TaskCard({ task, deleteTask}: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  // Use Less for me :3
  const [editMode, setEditMode] = useState(false);


  // use Sortable "abstractions"
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    } = 
    useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
      bg-mainBackgroundColor p-2.5 w-[120px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
      "
      />
    );
  }


  // edit mode handling hmmm :3 
  // since i  have permanently falsified the edit mode 
  // i dont think this segment is neede :p ...  was present in 0.0
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="bg-mainBackgroundColor p-2.5 w-[120px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      {/* <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p> */}
        <img className="mx-auto" src={`https://img.pokemondb.net/sprites/black-white/normal/${task.content}.png`} alt="Butterfree"/>
      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
