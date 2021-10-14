import React, { useContext } from "react";
import { Context } from "../../Context";
import Slider from "@mui/material/Slider";
import "./Header.scss";

import bfs from "../../scripts/bfs";
import dfs from "../../scripts/dfs";
import aStar from "../../scripts/aStar";
import dijkstra from "../../scripts/dijkstra";
import greedyBFS from "../../scripts/greedyBestFirstSearch";

const Header = () => {
  const context = useContext(Context);
  const { start, finish, board, updateNode, setAnimationSpeed } = context;

  return (
    <div>
      <div>
        <Slider
          id="animationSlider"
          defaultValue={50}
          valueLabelDisplay="on"
          step={10}
          min={10}
          max={100}
          onChange={(e) => setAnimationSpeed(e.target.value)}
        />
      </div>
      <button
        type="submit"
        onClick={() => {
          bfs(start.current, finish.current, board.current, updateNode);
        }}
      >
        BREADTH FIRST SEARCH
      </button>
      <button
        type="submit"
        onClick={() => {
          dfs(start.current, finish.current, board.current, updateNode);
        }}
      >
        DEPTH FIRST SEARCH
      </button>
      <button
        type="submit"
        onClick={() => {
          dijkstra(start.current, finish.current, board.current, updateNode);
        }}
      >
        DIJKSTRA
      </button>
      <button
        type="submit"
        onClick={() => {
          aStar(start.current, finish.current, board.current, updateNode);
        }}
      >
        ASTAR
      </button>
      <button
        type="submit"
        onClick={() => {
          greedyBFS(start.current, finish.current, board.current, updateNode);
        }}
      >
        GREEDY BEST FIRST SEARCH
      </button>
    </div>
  );
};

export default Header;
