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
  ITEM_PATH,
  PATH_COLOR,
} from "../../actionTypes";
import "./Node.scss";

const Node = React.memo(({ rowIdx, colIdx }) => {
  const { start, finish, setItemCache } = useContext(Context);
  const [type, setType] = useState(ITEM_INITIAL);

  setItemCache.current[REACTKEYS[rowIdx][colIdx]] = setType;

  const setColor = () => {
    if (
      (rowIdx === start.current.x && colIdx === start.current.y) ||
      (rowIdx === finish.current.x && colIdx === finish.current.y)
    )
      return FIXED_COLOR;

    if (type === ITEM_VISITED) return VISITED_COLOR;
    if (type === ITEM_CLICKED) return CLICKED_COLOR;
    if (type === ITEM_FIXED) return FIXED_COLOR;
    if (type === ITEM_PATH) return PATH_COLOR;

    return INITIAL_COLOR;
  };

  if (rowIdx === start.current.x && colIdx === start.current.y) {
    return (
      <div
        data-type={ITEM_FIXED}
        data-ridx={rowIdx}
        data-cidx={colIdx}
        style={{
          backgroundColor: setColor(),
        }}
        className="boardNode"
      />
    );
  }

  if (rowIdx === finish.current.x && colIdx === finish.current.y) {
    return (
      <div
        data-type={ITEM_FIXED}
        data-ridx={rowIdx}
        data-cidx={colIdx}
        style={{
          backgroundColor: setColor(),
        }}
        className="boardNode"
      />
    );
  }

  return (
    <div
      role="gridcell"
      data-type={type}
      data-ridx={rowIdx}
      data-cidx={colIdx}
      className="boardNode"
      style={{
        backgroundColor: setColor(),
        // transition: "all 2s ease",
      }}
    />
  );
});

export default Node;
