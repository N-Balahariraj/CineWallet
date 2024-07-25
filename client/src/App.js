// Libraries
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie'

// Components
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";

function App() {
  const [log, setLog] = useState(false);

  useEffect(()=>{
    if(Cookies.get('ACCESS_TOKEN')) setLog(true)
    // console.log(Cookies.get('ACCESS_TOKEN'))
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {log && <Route path="/app" element={<Main />} />}
      </Routes>
    </Router>
  );
}

export default App;
