import React from "react";
import { useEffect, useState } from "react";
import AddMovie from "./AddMovie";
import Header from "./Header";
import Movies from "./Movies";
import SlideIn from "./SlideIn";

export default function Main() {
  const [overlay, setOverlay] = useState(false);
  const [newMovie, setNewMovie] = useState([false, []]);
  const [search, setSearch] = useState("");

  return (
    <>
      <Header setOverlay={setOverlay} setSearch={setSearch} />
      <main className="h-[91vh] w-[98vw] flex ">
        <SlideIn overlay={overlay}>
          <AddMovie newMovie={newMovie} setOverlay={setOverlay} />
        </SlideIn>
        <div className="h-[100%] border-1"></div>
        <Movies
          setNewMovie={setNewMovie}
          setOverlay={setOverlay}
          search={search}
        />
      </main>
    </>
  );
}
