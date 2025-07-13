import "./index.css";
import {Routes, Route} from 'react-router-dom'
import Body from "./components/Body";
function App() {

  return(
  <>
    <Routes>
      <Route path="/" element={<Body/>} />
    </Routes>
  </>)
}

export default App;
