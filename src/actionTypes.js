import { v4 as uuidv4 } from "uuid";

// Board Size
export const BOARD_ROW = 16;
export const BOARD_COL = 32;

// Colors
export const INITIAL_COLOR = "gray";
export const VISITED_COLOR = "blue";
export const CLICKED_COLOR = "black";
export const FIXED_COLOR = "orange";
export const PATH_COLOR = "red";

// Board
export const BOARD = [];
for (let i = 0; i < BOARD_ROW; i++) {
  BOARD[i] = [];
  for (let j = 0; j < BOARD_COL; j++) {
    BOARD[i][j] = {
      color: INITIAL_COLOR,
      visited: false,
    };
  }
}

// Algos
export const DIJKSTRA = "DIJKSTRA";
export const BELLMAN_FORD = "BELLMAN_FORD";
export const A_STAR = "A_STAR";
export const DFS = "DFS";
export const BFS = "BFS";

// UUID
export const REACTKEYS = [];
for (let i = 0; i < BOARD_ROW; i++) {
  REACTKEYS[i] = [];
  for (let j = 0; j < BOARD_COL; j++) {
    REACTKEYS[i][j] = uuidv4();
  }
}

// Item state
export const ITEM_FIXED = "ITEM_FIXED";
export const ITEM_INITIAL = "ITEM_INITIAL";
export const ITEM_VISITED = "ITEM_VISITED";
export const ITEM_CLICKED = "ITEM_CLICKED";
export const ITEM_SHORTEST = "ITEM_SHORTEST";
