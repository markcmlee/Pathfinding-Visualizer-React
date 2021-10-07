import React from "react";
import Board from "./components/Board/Board.js";
import Header from "./components/Header/Header";
import "./App.scss";

const App = () => {
  // return <div style={{ maxWidth: "100%" }}>hi</div>;
  return (
    <div id="container">
      <h1 id="title">PATHFINDING VISUALIZER</h1>
      <Header />
      <Board />
    </div>
  );
};

export default App;
