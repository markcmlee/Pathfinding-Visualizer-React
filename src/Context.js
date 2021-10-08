import React, { createContext, useRef, useState } from "react";
import {
  BOARD,
  BOARD_ROW,
  BOARD_COL,
  ITEM_FIXED,
  REACTKEYS,
} from "./actionTypes";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [hasPath, setHasPath] = useState(true);
  const [isVisualized, setIsVisualized] = useState(false);
  const [isHelped, setIsHelped] = useState(false);

  const start = useRef({ x: Math.floor(BOARD_ROW / 2), y: 2 });
  const finish = useRef({ x: Math.floor(BOARD_ROW / 2), y: BOARD_COL - 3 });

  const board = useRef(JSON.parse(JSON.stringify(BOARD)));
  const setItemCache = useRef({});

  const updateNode = (ridx, cidx, itemType = ITEM_FIXED, timeFactor = 0) => {
    board.current[ridx][cidx] = itemType;
    const setItem = setItemCache.current[REACTKEYS[ridx][cidx]];

    if (timeFactor) {
      setTimeout(() => {
        setItem(itemType);
      }, timeFactor * 50);
    } else {
      setItem(itemType);
    }
  };

  return (
    <Context.Provider
      value={{
        hasPath,
        isVisualized,
        isHelped,
        start,
        finish,
        board,
        updateNode,
        setItemCache,
      }}
    >
      {children}
    </Context.Provider>
  );
};
