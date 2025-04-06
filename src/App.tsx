import "./App.css";
import {Routes, Route} from 'react-router-dom'
import KanbanBoard from "./components/KanbanBoard";
function App() {

  return(
  <>
    <Routes>
      <Route path="/" element={<KanbanBoard />} />
    </Routes>
  </>)
}

export default App;
