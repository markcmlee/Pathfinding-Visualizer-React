import PriorityQueue from "js-priority-queue";
import {
  BOARD_COL,
  BOARD_ROW,
  ITEM_PATH,
  ITEM_VISITED,
  ITEM_CLICKED,
  dx,
  dy,
} from "../../actionTypes";
import { heuristic, drawShortestPath, dist, prev } from "../utils";

const greedyBFS = (start, finish, board, updateNode) => {
  const opened = new Array(BOARD_ROW);
  for (let i = 0; i < BOARD_ROW; i++) {
    opened[i] = new Array(BOARD_COL).fill(false);
  }
  const pq = new PriorityQueue({ comparator: (a, b) => a.f - b.f });
  dist[start.x][start.y] = 0;
  let timeFactor = 1;

  const execute = () => {
    const startingF = heuristic(start, finish);
    pq.queue({ x: start.x, y: start.y, f: startingF });
    opened[start.x][start.y] = true;

    let find = false;
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

        const nextF = heuristic({ x: nextX, y: nextY }, finish);

        if (nextF < dist[nextX][nextY]) {
          prev[nextX][nextY] = { x: currX, y: currY };
          dist[nextX][nextY] = nextF;

          updateNode(nextX, nextY, ITEM_VISITED, timeFactor);
          timeFactor++;

          if (opened[nextX][nextY] === false) {
            pq.queue({ x: nextX, y: nextY, f: nextF });
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

export default greedyBFS;
