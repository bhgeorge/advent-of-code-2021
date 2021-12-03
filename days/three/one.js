const data = require('./data');

let gamma = '';
let epsilon = '';

const charCount = data[0].length;

const getMostCommon = (i) => {
  let o = 0;
  let l = 0;

  data.forEach((num) => {
    if (num.charAt(i) === '0') {
      o += 1;
    } else {
      l += 1;
    }
  });

  return o > l ? '0' : '1';
};

for (let i = 0; i < charCount; i++) {
  const g = getMostCommon(i);
  gamma += g;
  epsilon += g === '0' ? '1' : '0';
}

const gammaAsInt = parseInt(gamma, 2);
const epsilonAsInt = parseInt(epsilon, 2);

console.log(gammaAsInt * epsilonAsInt);
