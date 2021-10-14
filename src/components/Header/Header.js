import React, { useContext } from "react";
import { Context } from "../../Context";
import "./Header.scss";

import bfs from "../../scripts/bfs";
import dfs from "../../scripts/dfs";
import aStar from "../../scripts/aStar";
import dijkstra from "../../scripts/dijkstra";
import greedyBFS from "../../scripts/greedyBestFirstSearch";

const Header = () => {
  const context = useContext(Context);
  const {
    start,
    finish,
    board,
    updateNode,
    clear,
    clearPath,
    hasPath,
    isVisualized,
    setIsVisualized,
    setHasPath,
  } = context;

  return (
    <div>
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
          setIsVisualized(true);
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

      <div id="controlButtons">
        <button type="submit" onClick={clearPath}>
          CLEAR PATH
        </button>
        <button type="submit" onClick={clear}>
          CLEAR ALL
        </button>
      </div>
    </div>
  );
};

export default Header;
