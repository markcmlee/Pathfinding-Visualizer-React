import React, { useState, useEffect, useContext, useRef } from "react";
import {
  BOARD,
  REACTKEYS,
  ITEM_CLICKED,
  ITEM_INITIAL,
} from "../../actionTypes";
import { Context } from "../../Context";
import Node from "../Node/Node.js";
import "./Board.scss";

const Board = () => {
  const context = useContext(Context);
  const { start, finish, updateNode } = context;
  const [isClicking, setIsClicking] = useState(false);

  // console.log("start", start);
  // console.log("finish", finish);
  // console.log("BOARD", BOARD);
  // console.log("REACTKEYS", REACTKEYS);

  const onMouseDown = (e) => {
    const ridx = e.target.dataset.ridx;
    const cidx = e.target.dataset.cidx;
    // console.log(ridx, cidx);
    setIsClicking(true);
  };

  const onMouseUp = () => {
    setIsClicking(false);
  };

  const createWall = (e, mouseMove) => {
    if (e.target.className !== "boardNode") return;
    const { type } = e.target.dataset;
    if (type !== ITEM_INITIAL && type !== ITEM_CLICKED) return;
    const ridx = e.target.dataset.ridx;
    const cidx = e.target.dataset.cidx;

    // console.log("TYPEPEPEPEPEP", type);
    const itemType =
      type === ITEM_CLICKED && !mouseMove ? ITEM_INITIAL : ITEM_CLICKED;

    // e.target.dataset.type = itemType;

    updateNode(ridx, cidx, itemType);
  };

  const onMouseMove = (e) => {
    if (e.target.className !== "boardNode") return;
    const ridx = e.target.dataset.ridx;
    const cidx = e.target.dataset.cidx;
    if (isClicking) {
      // console.log("MOVING MOUSE", ridx, cidx);
      createWall(e, true);
    }
  };

  return (
    <div
      className="board"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {BOARD.map((row, rowIdx) => (
        <div className="boardRow" key={rowIdx}>
          {row.map((col, colIdx) => (
            <Node
              rowIdx={rowIdx}
              colIdx={colIdx}
              key={REACTKEYS[rowIdx][colIdx]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
