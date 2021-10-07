import React, { useContext } from "react";
import { Context } from "../../Context";
import "./Header.scss";

import bfs from "../../scripts/bfs";

const Header = () => {
  const context = useContext(Context);
  const { start, finish, board, updateNode } = context;

  return (
    <div>
      <button
        onClick={() => {
          console.log("STARAAAARRRTRTRT", start.current);
          bfs(start.current, finish.current, board.current, updateNode);
        }}
      >
        Hi
      </button>
    </div>
  );
};

export default Header;
