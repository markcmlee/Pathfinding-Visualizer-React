import React, { useState, useEffect, useContext, useRef } from "react";
import {
  BOARD,
  REACTKEYS,
  ITEM_CLICKED,
  ITEM_INITIAL,
  ITEM_FIXED,
} from "../../actionTypes";
import { Context } from "../../Context";
import Node from "../Node/Node.js";
import "./Board.scss";

const Board = () => {
  const context = useContext(Context);
  const { start, finish, updateNode } = context;
  const [isClicking, setIsClicking] = useState(false);
  const [clickingWall, setClickingWall] = useState(false);
  const [changingEndpoints, setChangingEndpoints] = useState({
    start: false,
    finish: false,
  });
  // console.log("start", start);
  // console.log("finish", finish);
  // console.log("BOARD", BOARD);
  // console.log("REACTKEYS", REACTKEYS);

  const onMouseDown = (e) => {
    const { ridx, cidx } = e.target.dataset;
    setIsClicking(true);
    if (e.target.dataset.type === ITEM_CLICKED) setClickingWall(true);
    else if (ridx == start.current.x && cidx == start.current.y)
      setChangingEndpoints({ start: true, finish: false });
    else if (ridx === finish.current.x && cidx === finish.current.y) {
      setChangingEndpoints({ start: false, finish: true });
    }
  };

  const onMouseUp = (e) => {
    setIsClicking(false);
    setClickingWall(false);
    const { ridx, cidx } = e.target.dataset;
    setChangingEndpoints({ start: false, finish: false });
  };

  const createWall = (e, mouseMove) => {
    if (e.target.className !== "boardNode") return;
    const { type } = e.target.dataset;
    if (type !== ITEM_INITIAL && type !== ITEM_CLICKED) return;
    const { ridx, cidx } = e.target.dataset;
    const itemType = clickingWall ? ITEM_INITIAL : ITEM_CLICKED;

    if (changingEndpoints.start || changingEndpoints.finish) {
      const formerX = changingEndpoints.start
        ? start.current.x
        : finish.current.x;
      const formerY = changingEndpoints.start
        ? start.current.y
        : finish.current.y;

      updateNode(formerX, formerY, ITEM_INITIAL);
      const next = { x: ridx, y: cidx };
      if (changingEndpoints.start) {
        start.current = next;
      } else {
        finish.current = next;
      }

      updateNode(next.x, next.y);
    } else {
      updateNode(ridx, cidx, itemType);
    }
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
