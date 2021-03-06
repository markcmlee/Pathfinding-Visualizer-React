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

  const onMouseDown = (e) => {
    const { ridx, cidx } = e.target.dataset;
    if (e.target.dataset.type == ITEM_CLICKED) {
      setClickingWall(true);
      setIsClicking(true);
    } else if (ridx == start.current.x && cidx == start.current.y)
      setChangingEndpoints({ start: true, finish: false });
    else if (ridx == finish.current.x && cidx == finish.current.y) {
      setChangingEndpoints({ start: false, finish: true });
    } else setIsClicking(true);
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
    const itemType =
      (type === ITEM_CLICKED && !mouseMove) || clickingWall
        ? ITEM_INITIAL
        : ITEM_CLICKED;
    updateNode(ridx, cidx, itemType);
  };

  const onMouseMove = (e) => {
    if (e.target.className !== "boardNode") return;
    const { ridx, cidx, type } = e.target.dataset;
    if (isClicking) {
      createWall(e, true);
    } else if (changingEndpoints.start || changingEndpoints.finish) {
      const formerX = changingEndpoints.start
        ? start.current.x
        : finish.current.x;
      const formerY = changingEndpoints.start
        ? start.current.y
        : finish.current.y;
      if (type === ITEM_CLICKED) return;
      updateNode(formerX, formerY, ITEM_INITIAL);
      const next = { x: Number(ridx), y: Number(cidx) };
      if (changingEndpoints.start) {
        start.current = next;
      } else {
        finish.current = next;
      }

      updateNode(Number(next.x), Number(next.y));
    }
  };

  const onMouseClick = (e) => {
    createWall(e, false);
  };

  return (
    <div
      role="grid"
      className="board"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onClick={onMouseClick}
    >
      {BOARD.map((row, rowIdx) => (
        <div className="boardRow" role="row" key={rowIdx}>
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
