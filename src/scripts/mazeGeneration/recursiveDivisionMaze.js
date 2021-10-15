import {
  BOARD_COL,
  BOARD_ROW,
  HORIZONTAL,
  VERTICAL,
  ITEM_FIXED,
  ITEM_CLICKED,
} from "../../actionTypes";

const chooseOrientation = (width, height) => {
  if (width < height) return HORIZONTAL;
  if (height < width) return VERTICAL;
  return Math.random() < 0.5 ? HORIZONTAL : VERTICAL;
};

const getRandom = (num) => Math.floor(Math.random() * num);

const recursiveDivision = (
  board,
  c,
  r,
  width,
  height,
  orientation,
  updateNode,
  timeFactor
) => {
  if (width < 2 || height < 2) return;
  let time = timeFactor;

  const isHorizontal = orientation === HORIZONTAL;

  // How long with the wall be?
  const length = isHorizontal ? width : height;

  // Where will the wall be drawn from?
  let wc = c + (isHorizontal ? 0 : 1 + getRandom(width - 2));
  let wr = r + (isHorizontal ? 1 + getRandom(height - 2) : 0);

  // Where will the passage through the wall exist?
  let pc = wc + (isHorizontal ? getRandom(width) : 0);
  let pr = wr + (isHorizontal ? 0 : getRandom(height));

  // Direction the wall will go
  let dc = isHorizontal ? 1 : 0;
  let dr = isHorizontal ? 0 : 1;

  for (let i = 0; i < length; i++) {
    if ((wr !== pr || wc !== pc) && board[wr][wc] !== ITEM_CLICKED) {
      updateNode(wr, wc, ITEM_CLICKED, time);
    }
    time += 0.5;
    wc += dc;
    wr += dr;
  }
  // Left or Top side
  const nextH = isHorizontal ? wr : height;
  const nextW = isHorizontal ? width : wc;
  const nextD = chooseOrientation(nextW, nextH);
  const nextR = r;
  const nextC = c;
  recursiveDivision(board, nextC, nextR, nextW, nextH, nextD, updateNode, time);

  // Bottom or Right side
  // const nextH2 = isHorizontal ? Math.abs(height - wr) : height;
  // const nextW2 = isHorizontal ? width : Math.abs(width - wc);
  // const nextD2 = chooseOrientation(nextW2, nextH2);
  // const nextR2 = isHorizontal ? wr : r;
  // const nextC2 = isHorizontal ? c : wc;
  // recursiveDivision(
  //   board,
  //   nextC2,
  //   nextR2,
  //   nextW2,
  //   nextH2,
  //   nextD2,
  //   updateNode,
  //   time
  // );
};

export default recursiveDivision;
