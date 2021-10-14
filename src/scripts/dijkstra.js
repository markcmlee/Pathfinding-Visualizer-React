import PriorityQueue from "js-priority-queue";
import {
  BOARD_COL,
  BOARD_ROW,
  ITEM_PATH,
  ITEM_VISITED,
  ITEM_CLICKED,
  dx,
  dy,
} from "../actionTypes";
import { drawShortestPath } from "./utils";
// import PriorityQueue from "./priorityQueue";

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
  // const pq = new PriorityQueue((a, b) => a.d - b.d);
  const pq = new PriorityQueue({ comparator: (a, b) => a.d - b.d });
  let timeFactor;

  const execute = () => {
    pq.queue({ x: start.x, y: start.y, d: 0 });
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
        pq.queue({ x: nextX, y: nextY, d: dist[nextX][nextY] });
      }

      if (find) {
        pq.clear();
        return true;
      }
    }
    return false;
  };
  const result = execute();

  if (result) drawShortestPath(start, finish, prev, updateNode, timeFactor);
  else return false;
};

export default dijkstra;
