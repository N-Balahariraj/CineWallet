import { useEffect, useState } from "react";
import AddMovie from "./components/AddMovie";
import Header from "./components/Header";
import Movies from "./components/Movies";
import SlideIn from "./components/SlideIn";


function App() {
  const[overlay, setOverlay] = useState(false)
  const[newMovie, setNewMovie] = useState([false,[]])
  const[search, setSearch] = useState("")

  return (
    <>
      <Header setOverlay={setOverlay} setSearch={setSearch}/>
      <main className="h-[92vh] w-[98vw] flex ">
        <SlideIn overlay={overlay}>
          <AddMovie newMovie={newMovie} setOverlay={setOverlay}/>
        </SlideIn>
        <div className="h-[100%] border-1"></div>
        <Movies setNewMovie={setNewMovie} setOverlay={setOverlay} search={search}/>
      </main>
    </>
  );
}

export default App;
