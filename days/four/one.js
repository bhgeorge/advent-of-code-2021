const data = require('./data');

const boardsByNumber = {};

const marked = [];

data.boards.forEach((board, i) => {
  board.forEach((row, j) => {
    row.forEach((val, k) => {
      if (boardsByNumber.hasOwnProperty(`${val}`)) {
        boardsByNumber[`${val}`].push({
          board: i,
          row: j,
          col: k,
        });
        return;
      }
      boardsByNumber[`${val}`] = [{ board: i, row: j, col: k }];
    });
  });

  // Init empty arrays to track if we've "won"
  marked.push({ row: new Array(5).fill(0), col: new Array(5).fill(0) });
});

const called = [];

const processWinner = (i) => {
  const board = data.boards[i];
  const uncalledNums = [];
  board.forEach((row) => {
    row.forEach((num) => {
      if (!called.includes(num)) {
        uncalledNums.push(num);
      }
    });
  });

  const sum = uncalledNums.reduce((prev, curr) => prev + curr, 0);

  console.log(sum * called.pop());
};

const processCall = (call) => {
  called.push(call);

  const boardsToMark = boardsByNumber[call];
  if (!!boardsToMark) {
    for (let i = 0; i < boardsToMark.length; i++) {
      const board = boardsToMark[i];
      marked[`${board.board}`].row[board.row] += 1;
      if (marked[`${board.board}`].row[board.row] === 5) {
        processWinner(board.board);
        return true;
      }

      marked[`${board.board}`].col[board.col] += 1;
      if (marked[`${board.board}`].col[board.col] === 5) {
        processWinner(board.board);
        return true;
      }
    }
  }

  return false;
};

for (let i = 0; i < data.calls.length; i++) {
  const hasWinner = processCall(data.calls[i]);
  if (hasWinner) {
    return;
  }
}
