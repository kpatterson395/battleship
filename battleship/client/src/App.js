import GameBoard from "./GameBoard";
import {useState,useEffect } from "react";

function App() {

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));

  // }, []);

  return (
    <div className="App">
      <h1>Battleship</h1>
      <GameBoard />
    </div>
  );
}

export default App;
