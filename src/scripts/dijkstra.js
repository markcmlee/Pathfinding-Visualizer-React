import { EndOfLineState, updatePartiallyEmittedExpression } from "typescript";
import {
  BOARD_COL,
  BOARD_ROW,
  ITEM_PATH,
  ITEM_VISITED,
  ITEM_CLICKED,
  dx,
  dy,
} from "../actionTypes";
import PriorityQueue from "./priorityQueue";

const dijkstra = (start, finish, board, updateNode) => {
  const dist = new Array(BOARD_ROW);
  const prev = new Array(BOARD_ROW);
  for (let i = 0; i < BOARD_ROW; i++) {
    dist[i] = [];
    prev[i] = [];
    for (let j = 0; j < BOARD_COL; j++) {
      dist[i][j] = Infinity;
      prev[i][j] = { x: -1, y: -1 };
    }
  }
  dist[start.x][start.y] = 0;
  const pq = new PriorityQueue((a, b) => a.d - b.d);
  let timeFactor;

  const execute = () => {
    pq.enqueue({ x: start.x, y: start.y, d: 0 });
    let find = false;

    while (pq.length > 0) {
      const curr = pq.peek();
      pq.dequeue();
      const currX = curr.x;
      const currY = curr.y;
      const currD = curr.d;

      for (let i = 0; i < dx.length; i++) {
        const nextX = currX + dx[i];
        const nextY = currY + dy[i];

        if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL)
          continue;
        if (
          dist[currX][currY] === Infinity ||
          dist[currX][currY] + 1 >= dist[nextX][nextY]
        )
          continue;
        if (board[nextX][nextY] === ITEM_CLICKED) continue;

        board[nextX][nextY] = ITEM_VISITED;
        updateNode(nextX, nextY, ITEM_VISITED, currD);
        prev[nextX][nextY] = { x: currX, y: currY };

        if (nextX === finish.x && nextY === finish.y) {
          timeFactor = currD + 1;
          find = true;
          break;
        }

        dist[nextX][nextY] = dist[currX][currY] + 1;
        pq.enqueue({ x: nextX, y: nextY, d: dist[nextX][nextY] });
      }

      if (find) {
        pq.clear();
        return true;
      }
    }
    return false;
  };
  const result = execute();
  console.log(result);

  const drawShortestPath = () => {
    const path = [];
    let { x, y } = finish;

    while (prev[x][y].x !== -1 && prev[x][y].y !== -1) {
      path.push({ x, y });
      const tempX = x;
      const tempY = y;
      x = prev[tempX][tempY].x;
      y = prev[tempX][tempY].y;
    }
    path.push({ x: start.x, y: start.y });
    for (let i = path.length - 1; i >= 0; i--) {
      x = path[i].x;
      y = path[i].y;
      updateNode(x, y, ITEM_PATH, timeFactor);
      timeFactor++;
    }
  };

  if (result) drawShortestPath();
};

export default dijkstra;
