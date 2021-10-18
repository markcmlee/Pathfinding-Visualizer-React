import React, { useContext } from "react";
import Button from "@mui/material/Button";
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
    <div id="buttonsContainer">
      <Button
        className="algoButton"
        variant="outlined"
        disabled={isVisualized}
        onClick={() => {
          setIsVisualized(true);
          bfs(start.current, finish.current, board.current, updateNode);
        }}
      >
        Breadth First Search
      </Button>

      <Button
        className="algoButton"
        variant="outlined"
        disabled={isVisualized}
        onClick={() => {
          setIsVisualized(true);
          dfs(start.current, finish.current, board.current, updateNode);
        }}
      >
        Depth First Search
      </Button>

      <Button
        className="algoButton"
        variant="outlined"
        disabled={isVisualized}
        onClick={() => {
          setIsVisualized(true);
          dijkstra(start.current, finish.current, board.current, updateNode);
        }}
      >
        Dijkstra
      </Button>

      <Button
        className="algoButton"
        variant="outlined"
        disabled={isVisualized}
        onClick={() => {
          aStar(start.current, finish.current, board.current, updateNode);
          setIsVisualized(true);
        }}
      >
        A Star
      </Button>

      <Button
        className="algoButton"
        variant="outlined"
        disabled={isVisualized}
        onClick={() => {
          greedyBFS(start.current, finish.current, board.current, updateNode);
          setIsVisualized(true);
        }}
      >
        Greedy Best First Search
      </Button>

      {/* <div>
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
            recursiveMaze(
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
      </div> */}

      <div id="controlButtons">
        <Button
          variant="contained"
          onClick={onClearPath}
          disabled={!isVisualized}
        >
          Clear Path
        </Button>

        <Button
          variant="contained"
          onClick={onClearAll}
          // disabled={!isVisualized}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default Header;
