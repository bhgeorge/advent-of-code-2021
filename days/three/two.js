const data = require('./data');

const charCount = data[0].length;

const getMostCommon = (i, subset) => {
  let o = 0;
  let l = 0;

  subset.forEach((num) => {
    if (num.charAt(i) === '0') {
      o += 1;
    } else {
      l += 1;
    }
  });

  return o > l ? '0' : '1';
};

const getLeastCommon = (i, subset) => {
  let o = 0;
  let l = 0;

  subset.forEach((num) => {
    if (num.charAt(i) === '0') {
      o += 1;
    } else {
      l += 1;
    }
  });

  return o > l ? '1' : '0';
};

let oxygen = [...data];
let co2 = [...data];

for (let i = 0; i < charCount; i++) {
  const mostCommon = getMostCommon(i, oxygen);
  if (oxygen.length > 1) {
    oxygen = oxygen.filter((o) => o.charAt(i) === mostCommon);
  }

  const leastCommon = getLeastCommon(i, co2);
  if (co2.length > 1) {
    co2 = co2.filter((c) => c.charAt(i) === leastCommon);
  }
}

const oNum = parseInt(oxygen[0], 2);
const cNum = parseInt(co2[0], 2);

console.log(oNum * cNum);
