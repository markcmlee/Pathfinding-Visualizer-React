import React, { useContext } from "react";
import { Context } from "../../Context";
import "./Header.scss";

import bfs from "../../scripts/bfs";
import dfs from "../../scripts/dfs";
import aStar from "../../scripts/aStar";

const Header = () => {
  const context = useContext(Context);
  const { start, finish, board, updateNode } = context;

  return (
    <div>
      <button
        onClick={() => {
          bfs(start.current, finish.current, board.current, updateNode);
        }}
      >
        BREADTH FIRST SEARCH
      </button>
      <button
        onClick={() => {
          dfs(start.current, finish.current, board.current, updateNode);
        }}
      >
        DEPTH FIRST SEARCH
      </button>
      <button
        onClick={() => {
          aStar(start.current, finish.current, board.current, updateNode);
        }}
      >
        ASTAR
      </button>
    </div>
  );
};

export default Header;
