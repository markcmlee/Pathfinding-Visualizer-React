import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../Context";
import {
  INITIAL_COLOR,
  VISITED_COLOR,
  REACTKEYS,
  ITEM_VISITED,
  ITEM_CLICKED,
  CLICKED_COLOR,
  ITEM_INITIAL,
  ITEM_FIXED,
  FIXED_COLOR,
} from "../../actionTypes";
import "./Node.scss";

const Node = ({ rowIdx, colIdx }) => {
  const { start, finish, setItemCache } = useContext(Context);
  const [type, setType] = useState(ITEM_INITIAL);

  setItemCache.current[REACTKEYS[rowIdx][colIdx]] = setType;

  const setColor = () => {
    if (
      (rowIdx === start.current.x && colIdx === start.current.y) ||
      (rowIdx === finish.current.x && colIdx === finish.current.y)
    )
      return "black";

    if (type === ITEM_VISITED) return VISITED_COLOR;
    if (type === ITEM_CLICKED) return CLICKED_COLOR;

    return INITIAL_COLOR;
  };

  // console.log(rowIdx, colIdx);

  if (rowIdx === start.current.x && colIdx === start.current.y) {
    return (
      <div
        data-type="string"
        data-ridx={rowIdx}
        data-cidx={colIdx}
        style={{
          backgroundColor: setColor(),
          color: "white",
          textAlign: "center",
        }}
        className="boardNode"
      >
        S
      </div>
    );
  }

  if (rowIdx === finish.current.x && colIdx === finish.current.y) {
    return (
      <div
        data-type="string"
        data-ridx={rowIdx}
        data-cidx={colIdx}
        style={{
          backgroundColor: setColor(),
          color: "white",
          textAlign: "center",
        }}
        className="boardNode"
      >
        F
      </div>
    );
  }

  return (
    <div
      data-type={type}
      data-ridx={rowIdx}
      data-cidx={colIdx}
      className="boardNode"
      style={{
        backgroundColor: setColor(),
      }}
    />
  );
};

export default Node;
