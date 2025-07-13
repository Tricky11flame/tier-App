import PlusIcon from "../icons/PlusIcon";

function CreateBttn({createNewColumn}) {
  return (
    <button
    onClick={() => {
      createNewColumn();
    }}
    className="h-[60px] w-[200px]  z-20 fixed bottom-3 right-3
    cursor-pointer rounded-lg bg-mainBackgroundColor
    border-2 border-columnBackgroundColor p-4 items-center 
    ring-rose-500 hover:ring-2 flex gap-2">
    <PlusIcon />
    Add Column
  </button>
  )
}

export default CreateBttn