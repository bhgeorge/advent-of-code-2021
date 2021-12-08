const data = require('./data');

const numValidSegments = [2, 4, 3, 7];

let count = 0;
data.forEach((inOut) => {
  inOut.outputs.forEach((output) => {
    if (numValidSegments.includes(output.length)) {
      count += 1;
    }
  });
});

console.log(count);
