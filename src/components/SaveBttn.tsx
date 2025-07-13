
function SaveBttn({saveData }) {
  return (
    <button
    onClick={() => {
      saveData();
    }}
    className="h-[30px] w-[200px]  z-20 fixed bottom-3 left-3
    cursor-pointer rounded-lg bg-mainBackgroundColor
    border-2 border-columnBackgroundColor p-4 items-center 
    ring-rose-500 hover:ring-2 flex gap-2 ">
    {/* <PokeIcon/> */}
    <img className="h-6 mx-auto" src={`../../2.png`} alt="loda"/>
    <div className="mx-auto">
    SAVE  DATA
    </div>
  </button> 
  )
}

export default SaveBttn