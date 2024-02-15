import HomePage from "./HomePage";
import "./App.css";
import Chat from "./Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
          {/* <HomePage/>
        </Route> */}
        <Route path="/chat" element={<Chat/>}/ >
          {/* <Chat/>
        </Route> */}
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
