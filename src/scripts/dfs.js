import {
  BOARD_ROW,
  BOARD_COL,
  ITEM_CLICKED,
  ITEM_VISITED,
  ITEM_PATH,
} from "../actionTypes";

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
    console.log("path", path);
    console.log("LENGTH", path.length);
    for (let i = path.length - 1; i >= 0; i--) {
      x = path[i].x;
      y = path[i].y;
      updateNode(x, y, ITEM_PATH, time);
      time++;
    }
  };

  if (result) drawShortestPath();
};

export default dfs;
