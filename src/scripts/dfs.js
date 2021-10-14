import {
  BOARD_ROW,
  BOARD_COL,
  ITEM_CLICKED,
  ITEM_VISITED,
  ITEM_PATH,
} from "../actionTypes";
import { drawShortestPath } from "./utils";

const dfs = (start, finish, board, updateNode) => {
  const dy = [0, 1, 0, -1];
  const dx = [-1, 0, 1, 0];
  const visited = [];
  const prev = new Array(BOARD_ROW);
  for (let i = 0; i < BOARD_ROW; i++) {
    visited[i] = Array(BOARD_COL).fill(false);
    prev[i] = [];
    for (let j = 0; j < BOARD_COL; j++) {
      prev[i][j] = { x: -1, y: -1 };
    }
  }
  let find = false;
  let time = -Infinity;

  const execute = (x, y, timeFactor) => {
    visited[x][y] = true;

    for (let i = 0; i < dx.length; i++) {
      const nextX = x + dx[i];
      const nextY = y + dy[i];

      if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL)
        continue;
      if (visited[nextX][nextY] || board[nextX][nextY] === ITEM_CLICKED)
        continue;

      prev[nextX][nextY] = { x, y };
      updateNode(nextX, nextY, ITEM_VISITED, timeFactor);
      if (nextX === finish.x && nextY === finish.y) {
        find = true;
        if (timeFactor > time) time = timeFactor;
        return;
      }
      execute(nextX, nextY, timeFactor + 1);
      if (find) return find;
    }
  };

  const result = execute(start.x, start.y, 1);

  if (result) drawShortestPath(start, finish, prev, updateNode, time);
  else return false;
};

export default dfs;
