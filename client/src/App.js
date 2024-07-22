import { Outlet } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Register from "./components/Register";



function App() {

  return (
    <>
      <Outlet/>
    </>
  );
}

export default App;
