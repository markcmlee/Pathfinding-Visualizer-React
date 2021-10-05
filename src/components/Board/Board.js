import React, { useState, useEffect, useContext, useRef } from "react";
import { BOARD, REACTKEYS } from "../../actionTypes";
import { Context } from "../../Context";
import Node from "../Node/Node.js";
import "./Board.scss";

const Board = () => {
  const context = useContext(Context);
  // return <h1>hello</h1>;
  return (
    <div className="board">
      {BOARD.map((row, rIdx) => (
        <div className="boardRow" key={rIdx}>
          {row.map((col, cIdx) => (
            <Node key={REACTKEYS[(rIdx, cIdx)]} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
