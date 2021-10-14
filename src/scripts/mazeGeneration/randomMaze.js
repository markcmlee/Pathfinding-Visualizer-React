import {
  BOARD_COL,
  BOARD_ROW,
  ITEM_FIXED,
  ITEM_CLICKED,
  dx,
  dy,
} from "../../actionTypes";

const randomMaze = (board, updateNode, timeFactor) => {
  let time = timeFactor;
  board.forEach((row, ridx) => {
    row.forEach((item, cidx) => {
      const randomBool = Math.random() < 0.25;
      if (randomBool && board[ridx][cidx] !== ITEM_FIXED) {
        updateNode(ridx, cidx, ITEM_CLICKED, time);
        time += 0.1;
      }
    });
  });
};

export default randomMaze;
