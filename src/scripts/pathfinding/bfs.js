import {
  BOARD_ROW,
  BOARD_COL,
  ITEM_CLICKED,
  ITEM_VISITED,
  dx,
  dy,
} from "../../actionTypes";
import { drawShortestPath, dist, prev } from "../utils";

const bfs = (start, finish, board, updateNode) => {
  dist[start.x][start.y] = 0;

  const queue = [];
  const visited = [];
  for (let i = 0; i < BOARD_ROW; i++) {
    visited[i] = new Array(BOARD_COL).fill(false);
  }
  let timeFactor = 1;

  const execute = () => {
    queue.push({ x: start.x, y: start.y });
    visited[start.x][start.y] = true;
    let find = false;
    while (queue.length > 0) {
      const current = queue.shift();
      // base case: found finish node
      if (current.x === finish.x && current.y === finish.y) break;

      for (let i = 0; i < dx.length; i++) {
        const nextX = current.x + dx[i];
        const nextY = current.y + dy[i];

        if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL)
          continue;
        if (visited[nextX][nextY] || board[nextX][nextY] === ITEM_CLICKED)
          continue;

        visited[nextX][nextY] = true;
        prev[nextX][nextY] = { x: current.x, y: current.y };
        updateNode(nextX, nextY, ITEM_VISITED, timeFactor);
        timeFactor++;
        queue.push({ x: nextX, y: nextY });

        if (nextX === finish.x && nextY === finish.y) {
          find = true;
          break;
        }
      }
    }
    return find;
  };
  const result = execute();

  if (result) drawShortestPath(start, finish, prev, updateNode, timeFactor);
  else return false;
};

export default bfs;
