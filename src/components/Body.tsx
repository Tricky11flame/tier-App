import TierBoard from "./TierBoard.tsx"
import Head from "./Head.tsx"
function Body() {
  return (
    <div className="min-h-screen bg-zinc-950 p-3 overflow-x-auto ">
        <Head/>
        <div className="">
            <TierBoard />
        </div>
    </div>
  )
}

export default Body