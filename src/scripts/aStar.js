import {
  BOARD_COL,
  BOARD_ROW,
  dx,
  dy,
  ITEM_PATH,
  ITEM_VISITED,
  ITEM_CLICKED,
} from "../actionTypes";
import PriorityQueue from "./priorityQueue";

// const aStar = (start, finish, board, updateNode) => {
//   const opened = new Array(BOARD_ROW)
//     .fill()
//     .map((row) => new Array(BOARD_COL).fill(false));

//   const pq = new PriorityQueue();

//   const h = (pos1, pos2) =>
//     Math.abs(pos2.x - pos1.x) + Math.abs(pos2.y - pos1.y);

//   const dist = new Array(BOARD_ROW);
//   const prev = new Array(BOARD_ROW);
//   for (let i = 0; i < BOARD_ROW; i++) {
//     dist[i] = [];
//     prev[i] = [];
//     for (let j = 0; j < BOARD_COL; j++) {
//       dist[i][j] = Infinity;
//       prev[i][j] = { x: -1, y: -1 };
//     }
//   }
//   dist[start.x][start.y] = 0;
//   let timeFactor = 1;

//   const execute = () => {
//     const startPrio = h(start, finish);
//     pq.enqueue({ x: start.x, y: start.y, prio: startPrio });
//     dist[start.x][start.y] = 0;
//     opened[start.x][start.y] = true;

//     let find = false;

//     while (pq.length) {
//       const current = pq.peek();

//       if (current.x === finish.x && current.y === finish.y) {
//         pq.clear();
//         find = true;
//         break;
//       }

//       opened[current.x][current.y] = false;
//       pq.dequeue();

//       for (let i = 0; i < dx.length; i++) {
//         const nextX = current.x + dx[i];
//         const nextY = current.y + dy[i];

//         if (nextX < 0 || nextX >= BOARD_ROW || nextY < 0 || nextY >= BOARD_COL)
//           continue;
//         if (board[nextX][nextY] === ITEM_CLICKED) continue;

//         const g = dist[current.x][current.y] + 1;
//         const nextPrio = g + h(nextX, nextY);

//         if (g < dist[nextX][nextY]) {
//           prev[nextX][nextY] = { x: current.x, y: current.y };
//           dist[nextX][nextY] = g;

//           updateNode(nextX, nextY, ITEM_VISITED, timeFactor);
//           timeFactor++;

//           if (opened[nextX][nextY] === false) {
//             pq.enqueue({ x: nextX, y: nextY, prio: nextPrio });
//             opened[nextX][nextY] = true;
//           }
//         }
//       }
//     }
//     console.log("PREVPREVPREV", prev);
//     return find;
//   };

//   const result = execute();

//   const drawShortestPath = () => {
//     const path = [];
//     let { x, y } = finish;

//     while (prev[x][y].x !== -1 && prev[x][y].y !== -1) {
//       path.push({ x, y });
//       const tempX = x;
//       const tempY = y;
//       x = prev[tempX][tempY].x;
//       y = prev[tempX][tempY].y;
//     }
//     path.push({ x: start.x, y: start.y });
//     for (let i = path.length - 1; i >= 0; i--) {
//       x = path[i].x;
//       y = path[i].y;
//       updateNode(x, y, ITEM_PATH, timeFactor);
//       timeFactor++;
//     }
//   };

//   if (result) {
//     drawShortestPath();
//   }
// };

const aStar = (start, finish, board, updateNode) => {
  const h = (pos1, pos2) =>
    Math.abs(pos2.x - pos1.x) + Math.abs(pos2.y - pos1.y);

  let count = 0;
  const pq = new PriorityQueue();
  pq.enqueue({ x: start.x, y: start.y, prio: 0 });
  const prevParent = {};

  const gScore = new Array(BOARD_ROW)
    .fill()
    .map((row) => new Array(BOARD_COL).fill(Infinity));
  gScore[start.x][start.y] = 0;
  const fScore = new Array(BOARD_ROW)
    .fill()
    .map((row) => new Array(BOARD_COL).fill(Infinity));
  fScore[start.x][start.y] = h(start, finish + gScore[start.x][start.y]);

  const openSetTracker = { start };
};

export default aStar;
