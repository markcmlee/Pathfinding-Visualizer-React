import React, { createContext, useRef, useState } from "react";
import { BOARD, BOARD_ROW, BOARD_COL } from "./actionTypes";

export const Context = createContext();

export const Provider = ({ children }) => {
  const [hasPath, setHasPath] = useState(true);
  const [isVisualized, setIsVisualized] = useState(false);
  const [isHelped, setIsHelped] = useState(false);

  const start = useRef({ x: Math.floor(BOARD_ROW / 2), y: 2 });
  const finish = useRef({ x: Math.floor(BOARD_ROW / 2), y: BOARD_COL - 3 });

  const board = useRef(JSON.parse(JSON.stringify(BOARD)));

  return (
    <Context.Provider
      value={{
        hasPath,
        isVisualized,
        isHelped,
        start,
        finish,
        board,
      }}
    >
      {children}
    </Context.Provider>
  );
};
