const data = require('./data');

const plottedSegments = {};

const getMinMax = (a, b) => {
  if (b > a) {
    return { min: a, max: b };
  }
  return { min: b, max: a };
};

const plotSegment = (x, y) => {
  const key = `${x}-${y}`;
  if (!!plottedSegments[key]) {
    plottedSegments[key] += 1;
    return;
  }
  plottedSegments[key] = 1;
};

data.forEach((pair) => {
  const [[x1, y1], [x2, y2]] = pair;
  // vertical line
  if (x1 === x2) {
    const yMinMax = getMinMax(y1, y2);
    for (i = yMinMax.min; i <= yMinMax.max; i++) {
      plotSegment(x1, i);
    }
    return;
  }

  // horiz line
  if (y1 === y2) {
    const xMinMax = getMinMax(x1, x2);
    for (i = xMinMax.min; i <= xMinMax.max; i++) {
      plotSegment(i, y1);
    }
    return;
  }

  // diagonal
  if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
    const xDir = x2 - x1 > 0 ? 1 : -1;
    const yDir = y2 - y1 > 0 ? 1 : -1;
    for (i = 0; i <= Math.abs(x1 - x2); i++) {
      plotSegment(x1 + i * xDir, y1 + i * yDir);
    }
  }
});

let twoOrMore = 0;

Object.values(plottedSegments).forEach((val) => {
  if (val > 1) {
    twoOrMore += 1;
  }
});

console.log(twoOrMore);
