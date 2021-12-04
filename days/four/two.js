const data = require('./data');

const boardsByNumber = {};

const marked = [];
let boardsRemaining = data.boards.length;

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
  marked.push({
    row: new Array(5).fill(0),
    col: new Array(5).fill(0),
    hasWon: false,
  });
});

const called = [];

const processWinner = (i) => {
  boardsRemaining -= 1;

  if (boardsRemaining === 0) {
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
    return true;
  }

  marked[`${i}`].hasWon = true;
  return false;
};

const processCall = (call) => {
  called.push(call);

  const boardsToMark = boardsByNumber[call];
  if (!!boardsToMark) {
    for (let i = 0; i < boardsToMark.length; i++) {
      const board = boardsToMark[i];
      marked[`${board.board}`].row[board.row] += 1;
      if (marked[`${board.board}`].row[board.row] === 5) {
        if (!marked[`${board.board}`].hasWon) {
          if (processWinner(board.board)) {
            return;
          }
        }
      }

      marked[`${board.board}`].col[board.col] += 1;
      if (marked[`${board.board}`].col[board.col] === 5) {
        if (!marked[`${board.board}`].hasWon) {
          if (processWinner(board.board)) {
            return;
          }
        }
      }
    }
  }

  return false;
};

for (let i = 0; i < data.calls.length; i++) {
  const hasLastWinner = processCall(data.calls[i]);
  if (hasLastWinner) {
    return;
  }
}
