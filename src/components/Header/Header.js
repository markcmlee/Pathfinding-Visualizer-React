import React, { useContext } from "react";
import { Context } from "../../Context";
import "./Header.scss";

import { BOARD_COL, BOARD_ROW, HORIZONTAL, VERTICAL } from "../../actionTypes";
import bfs from "../../scripts/pathfinding/bfs";
import dfs from "../../scripts/pathfinding/dfs";
import aStar from "../../scripts/pathfinding/aStar";
import dijkstra from "../../scripts/pathfinding/dijkstra";
import greedyBFS from "../../scripts/pathfinding/greedyBestFirstSearch";
import randomMaze from "../../scripts/mazeGeneration/randomMaze";
import recursiveDivision from "../../scripts/mazeGeneration/recursiveDivisionMaze";

const Header = () => {
  const context = useContext(Context);
  const {
    start,
    finish,
    board,
    updateNode,
    clearAll,
    clearPath,
    hasPath,
    isVisualized,
    setIsVisualized,
    setHasPath,
    animationSpeed,
  } = context;

  const onClearAll = () => {
    setIsVisualized(false);
    clearAll();
  };

  const onClearPath = () => {
    setIsVisualized(false);
    clearPath();
  };

  return (
    <div>
      <button
        type="submit"
        disabled={isVisualized}
        onClick={() => {
          setIsVisualized(true);
          bfs(start.current, finish.current, board.current, updateNode);
        }}
      >
        BREADTH FIRST SEARCH
      </button>
      <button
        type="submit"
        disabled={isVisualized}
        onClick={() => {
          setIsVisualized(true);
          dfs(start.current, finish.current, board.current, updateNode);
        }}
      >
        DEPTH FIRST SEARCH
      </button>
      <button
        type="submit"
        disabled={isVisualized}
        onClick={() => {
          setIsVisualized(true);
          dijkstra(start.current, finish.current, board.current, updateNode);
        }}
      >
        DIJKSTRA
      </button>
      <button
        type="submit"
        disabled={isVisualized}
        onClick={() => {
          aStar(start.current, finish.current, board.current, updateNode);
          setIsVisualized(true);
        }}
      >
        ASTAR
      </button>
      <button
        type="submit"
        disabled={isVisualized}
        onClick={() => {
          greedyBFS(start.current, finish.current, board.current, updateNode);
          setIsVisualized(true);
        }}
      >
        GREEDY BEST FIRST SEARCH
      </button>

      <div>
        <button
          type="submit"
          disabled={isVisualized}
          onClick={() => {
            onClearAll();
            randomMaze(board.current, updateNode, 1);
          }}
        >
          RANDOM MAZE
        </button>
        <button
          type="submit"
          disabled={isVisualized}
          onClick={() => {
            onClearAll();
            recursiveDivision(
              board.current,
              0,
              0,
              BOARD_COL,
              BOARD_ROW,
              HORIZONTAL,
              updateNode,
              1
            );
          }}
        >
          RECURSIVE DIVISION MAZE
        </button>
      </div>

      <div id="controlButtons">
        <button type="submit" onClick={onClearPath} disabled={!isVisualized}>
          CLEAR PATH
        </button>
        <button type="submit" onClick={onClearAll}>
          CLEAR ALL
        </button>
      </div>
    </div>
  );
};

export default Header;
