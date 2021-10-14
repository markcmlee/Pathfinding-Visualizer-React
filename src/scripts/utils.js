import { ITEM_PATH, BOARD_ROW, BOARD_COL } from "../actionTypes";

export const dist = new Array(BOARD_ROW)
  .fill()
  .map(() => new Array(BOARD_COL).fill(Infinity));
export const prev = new Array(BOARD_ROW)
  .fill()
  .map(() => new Array(BOARD_COL).fill({ x: -1, y: -1 }));

export const heuristic = (startNode, finishNode) =>
  Math.abs(startNode.x - finishNode.x) + Math.abs(startNode.y - finishNode.y);

const reset = () => {
  for (let i = 0; i < BOARD_ROW; i++) {
    dist[i] = [];
    prev[i] = [];
    for (let j = 0; j < BOARD_COL; j++) {
      dist[i][j] = Infinity;
      prev[i][j] = { x: -1, y: -1 };
    }
  }
};

export const drawShortestPath = (start, finish, prev, updateNode, time) => {
  const path = [];
  let { x, y } = finish;
  let timeFactor = time;
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
  reset();
};
