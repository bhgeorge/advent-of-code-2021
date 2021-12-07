const data = require('./data');

const crabsAtPosition = {};

let max = 0;
data.forEach((pos) => {
  if (pos > max) {
    max = pos;
  }
  const key = `${pos}`;
  if (!crabsAtPosition[key]) {
    crabsAtPosition[key] = 1;
    return;
  }

  crabsAtPosition[key] += 1;
});

let leastFuel = 10000000000000000000;
const asArr = Object.entries(crabsAtPosition);

for (let i = 0; i < max; i++) {
  let cost = 0;
  asArr.forEach(([k, v]) => {
    cost += Math.abs(parseInt(k, 10) - i) * v;
  });
  if (cost < leastFuel) {
    leastFuel = cost;
  }
}

console.log(leastFuel);
