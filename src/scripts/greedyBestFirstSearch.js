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
import { heuristic } from "./utils";
// import PriorityQueue from "./priorityQueue";

// const getNeighbors = (node, grid) => {
//   const neighbors = [];
//   const { x, y } = node;

//   if (x !== 0) neighbors.push(grid[x - 1][y]);
//   if (y !== grid[0].length - 1) neighbors.push(grid[x][y + 1]);
//   if (x !== grid.length - 1) neighbors.push(grid[x + 1][y]);
//   if (y !== 0) neighbors.push(grid[x][y - 1]);

//   return neighbors.filter((neighbor) => !neighbor)
// }

const greedyBFS = (start, finish, board, updateNode) => {
  const opened = new Array(BOARD_ROW);
  for (let i = 0; i < BOARD_ROW; i++) {
    opened[i] = new Array(BOARD_COL).fill(false);
  }
  const pq = new PriorityQueue({ comparator: (a, b) => a.f - b.f });
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
    const startingF = heuristic(start, finish);
    pq.queue({ x: start.x, y: start.y, f: startingF });
    dist[start.x][start.y] = 0;
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

      for (let i = 0; i < dx.length; i++) {
        const nextX = currX + dx[i];
        const nextY = currY + dy[i];

        if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL)
          continue;
        if (board[nextX][nextY] === ITEM_CLICKED) continue;

        const nextF = heuristic({ x: nextX, y: nextY }, finish);
        console.log(dist);

        if (nextF < dist[nextX][nextY]) {
          prev[nextX][nextY] = { x: currX, y: currY };
          dist[nextX][nextY] = nextF;
          updateNode(nextX, nextY, ITEM_VISITED, timeFactor);
          timeFactor++;

          if (opened[nextX][nextY] === false) {
            pq.queue({ x: nextX, y: nextY, prio: nextF });
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

export default greedyBFS;
