import React, { useContext } from "react";
import Slider from "@mui/material/Slider";

import { Context } from "./Context";
import Board from "./components/Board/Board.js";
import Header from "./components/Header/Header";

import "./App.scss";

const App = () => {
  const context = useContext(Context);
  const { setAnimationSpeed } = context;
  return (
    <div id="container">
      <h1 id="title">PATHFINDING VISUALIZER</h1>
      <Slider
        id="animationSlider"
        defaultValue={50}
        valueLabelDisplay="on"
        step={10}
        min={10}
        max={100}
        onChange={(e) => setAnimationSpeed(e.target.value)}
      />
      <Header />
      <Board />
    </div>
  );
};

export default App;
