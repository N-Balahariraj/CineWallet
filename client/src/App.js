// Libraries
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";

function App() {
  const [log, setLog] = useState("Out");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setLog={setLog}/>} />
        <Route path="/register" element={<Register />} />
        {log=="In" && <Route path="/app" element={<Main />} />}
      </Routes>
    </Router>
  );
}

export default App;
