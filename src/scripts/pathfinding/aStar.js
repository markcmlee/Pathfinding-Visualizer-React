import PriorityQueue from "js-priority-queue";
import {
  BOARD_COL,
  BOARD_ROW,
  ITEM_VISITED,
  ITEM_CLICKED,
  dx,
  dy,
} from "../../actionTypes";
import { heuristic, drawShortestPath, dist, prev } from "../utils";
// import PriorityQueue from "./priorityQueue";

const aStar = (start, finish, board, updateNode) => {
  const opened = new Array(BOARD_ROW);
  for (let i = 0; i < BOARD_ROW; i++) {
    opened[i] = new Array(BOARD_COL).fill(false);
  }
  // const pq = new PriorityQueue((a, b) => a.prio - b.prio);
  const pq = new PriorityQueue({ comparator: (a, b) => a.prio - b.prio });

  dist[start.x][start.y] = 0;
  let timeFactor = 1;
  const execute = () => {
    const startPrio = heuristic(start, finish);
    pq.queue({ x: start.x, y: start.y, prio: startPrio });
    dist[start.x][start.y] = 0;
    opened[start.x][start.y] = true;

    let find = false;
    // console.log(pq);

    while (pq.length) {
      const current = pq.peek();
      const currX = current.x;
      const currY = current.y;

      if (currX === finish.x && currY === finish.y) {
        pq.clear();
        find = true;
        break;
      }

      opened[currX][currY] = false;
      pq.dequeue();

      for (let i = 0; i < dx.length; i++) {
        const nextX = currX + dx[i];
        const nextY = currY + dy[i];

        if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL)
          continue;
        if (board[nextX][nextY] === ITEM_CLICKED) continue;

        const g = dist[currX][currY] + 1;
        const nextPrio = g + heuristic({ x: nextX, y: nextY }, finish);

        if (g < dist[nextX][nextY]) {
          // console.log(currX, currY);
          prev[nextX][nextY] = { x: currX, y: currY };
          dist[nextX][nextY] = g;

          updateNode(nextX, nextY, ITEM_VISITED, timeFactor);
          timeFactor++;

          if (opened[nextX][nextY] === false) {
            pq.queue({ x: nextX, y: nextY, prio: nextPrio });
            opened[nextX][nextY] = true;
          }
        }
      }
    }
    return find;
  };

  const result = execute();

  if (result) drawShortestPath(start, finish, prev, updateNode, timeFactor);
  else return false;
};

export default aStar;
