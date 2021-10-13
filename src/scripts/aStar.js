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
// import PriorityQueue from "js-priority-queue";

const aStar = (start, finish, board, updateNode) => {
  const opened = new Array(BOARD_ROW);
  for (let i = 0; i < BOARD_ROW; i++) {
    opened[i] = new Array(BOARD_COL).fill(false);
  }
  const pq = new PriorityQueue((a, b) => a.prio - b.prio);
  // const pq = new PriorityQueue({ comparator: (a, b) => a.prio - b.prio });

  const heuristic = (startNode) =>
    Math.abs(startNode.x - finish.x) + Math.abs(startNode.y - finish.y);

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
  let timeFactor = 1;

  const execute = () => {
    const startPrio = heuristic(start);
    pq.queue({ x: start.x, y: start.y, prio: startPrio });
    dist[start.x][start.y] = 0;
    opened[start.x][start.y] = true;

    let find = false;
    console.log(pq);

    while (pq.items.length) {
      const current = pq.peek();
      const currX = current.x;
      const currY = current.y;

      if (currX === finish.x && currY === finish.y) {
        pq.clear();
        find = true;
        break;
      }

      opened[currX][currY] = false;
      console.log(pq.dequeue());

      for (let i = 0; i < dx.length; i++) {
        const nextX = currX + dx[i];
        const nextY = currY + dy[i];

        if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL)
          continue;
        if (board[nextX][nextY] === ITEM_CLICKED) continue;

        const g = dist[currX][currY] + 1;
        const nextPrio = g + heuristic({ x: nextX, y: nextY });

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
  console.log(result);

  const drawShortestPath = () => {
    const path = [];
    let { x } = finish;
    let { y } = finish;

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

export default aStar;
