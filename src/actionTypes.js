import { v4 as uuidv4 } from "uuid";

let height = document.body.clientHeight;
let width = document.body.clientWidth;

// Board Size
export let BOARD_ROW = 17;
export let BOARD_COL = 37;

if (width < 950) {
  BOARD_ROW = 13;
  BOARD_COL = 27;
}

// console.log(document.body.clientHeight);
// console.log(window.screen.width);

// Colors
export const INITIAL_COLOR = "white";
export const VISITED_COLOR = "#8499f8";
export const CLICKED_COLOR = "gray";
export const FIXED_COLOR = "orange";
export const PATH_COLOR = "#f5676d";

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

// Directionals
export const dx = [-1, 1, 0, 0];
export const dy = [0, 0, -1, 1];

// UUID
export const REACTKEYS = [];
for (let i = 0; i < BOARD_ROW; i++) {
  REACTKEYS[i] = [];
  for (let j = 0; j < BOARD_COL; j++) {
    REACTKEYS[i][j] = uuidv4();
  }
}

// Node state
export const ITEM_FIXED = "ITEM_FIXED";
export const ITEM_INITIAL = "ITEM_INITIAL";
export const ITEM_VISITED = "ITEM_VISITED";
export const ITEM_CLICKED = "ITEM_CLICKED";
export const ITEM_PATH = "ITEM_PATH";

// Maze
export const HORIZONTAL = "HORIZONTAL";
export const VERTICAL = "VERTICAL";
