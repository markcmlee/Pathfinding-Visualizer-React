import React, { createContext, useRef, useState, useCallback } from "react";
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
  const [animationSpeed, setAnimationSpeed] = useState(100);

  const start = useRef({ x: Math.floor(BOARD_ROW / 2), y: 2 });
  const finish = useRef({ x: Math.floor(BOARD_ROW / 2), y: BOARD_COL - 3 });

  const board = useRef(JSON.parse(JSON.stringify(BOARD)));
  const setItemCache = useRef({});

  const updateNode = useCallback(
    (ridx, cidx, itemType = ITEM_FIXED, timeFactor) => {
      board.current[ridx][cidx] = itemType;
      const setItem = setItemCache.current[REACTKEYS[ridx][cidx]];

      if (timeFactor) {
        console.log("SPEEEEED", animationSpeed);
        setTimeout(() => {
          setItem(itemType);
        }, timeFactor * animationSpeed);
      } else {
        setItem(itemType);
      }
    }
  );

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
        setAnimationSpeed,
        setItemCache,
      }}
    >
      {children}
    </Context.Provider>
  );
};
