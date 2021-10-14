import React, { createContext, useRef, useState, useCallback } from "react";
import {
  BOARD,
  BOARD_ROW,
  BOARD_COL,
  ITEM_FIXED,
  ITEM_INITIAL,
  ITEM_CLICKED,
  REACTKEYS,
  ITEM_PATH,
  ITEM_VISITED,
} from "./actionTypes";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [hasPath, setHasPath] = useState(true);
  const [isVisualized, setIsVisualized] = useState(false);
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
        // console.log("SPEED", animationSpeed);
        setTimeout(() => {
          setItem(itemType);
        }, timeFactor);
        // setTimeout(() => {
        //   setItem(itemType);
        // }, timeFactor * animationSpeed);
      } else {
        setItem(itemType);
      }
    }
  );

  const clearAll = () => {
    // if (!hasPath) setHasPath(true);
    // if (isVisualized) setIsVisualized(false);
    const currentBoard = board.current;
    currentBoard.forEach((row, ridx) => {
      row.forEach((item, cidx) => {
        updateNode(ridx, cidx, ITEM_INITIAL);
      });
    });
  };

  const clearPath = () => {
    board.current.forEach((row, ridx) => {
      row.forEach((item, cidx) => {
        if (
          board.current[ridx][cidx] === ITEM_PATH ||
          board.current[ridx][cidx] === ITEM_VISITED
        ) {
          updateNode(ridx, cidx, ITEM_INITIAL);
        }
      });
    });
  };

  return (
    <Context.Provider
      value={{
        // state
        hasPath,
        isVisualized,
        start,
        finish,
        board,

        // methods
        updateNode,
        setAnimationSpeed,
        clearAll,
        clearPath,
        setIsVisualized,
        setItemCache,
      }}
    >
      {children}
    </Context.Provider>
  );
};
