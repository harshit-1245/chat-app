import logo from './logo.svg';
import './App.css';
import HomePage from "../src/components/HomePage"
import ChatPage from "../src/components/ChatPage"
import {Routes,Route} from "react-router-dom"
function App() {

  return (
   <div className="App">
    <Routes>
     <Route path="/" element={<HomePage/>} />
     <Route path="/chat" element={<ChatPage/>}/>
     </Routes>
   </div>
  );
}

export default App;
