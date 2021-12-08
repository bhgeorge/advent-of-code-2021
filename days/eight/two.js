const data = require('./data');

const outputVals = [];

// const data = [
//   {
//     inputs: [
//       'acedgfb',
//       'cdfbe',
//       'gcdfa',
//       'fbcad',
//       'dab',
//       'cefabd',
//       'cdfgeb',
//       'eafb',
//       'cagedb',
//       'ab',
//     ],
//     outputs: ['cdfeb', 'fcadb', 'cdfeb', 'cdbaf'],
//   },
// ];

const alphaSort = (str) => str.split('').sort().join('');

data.forEach((entry) => {
  const sorted = entry.inputs
    .map((n) => alphaSort(n))
    .sort((a, b) => a.length - b.length);

  const getSharedSegments = (input, known) => {
    let shared = 0;
    for (let i = 0; i < input.length; i++) {
      if (known.includes(input.charAt(i))) {
        shared += 1;
      }
    }
    return shared;
  };

  const one = sorted[0];
  const four = sorted[2];

  // Test the 6 length items
  let zero = '';
  let six = '';
  let nine = '';
  for (let i = 6; i < 9; i++) {
    const num = sorted[i];
    const sharesWithFour = getSharedSegments(num, four);
    if (sharesWithFour === 4) {
      nine = num;
      continue;
    }

    const sharesWithOne = getSharedSegments(num, one);
    if (sharesWithOne === 2) {
      zero = num;
      continue;
    }

    six = num;
  }

  // Test the 5 length items
  let two = '';
  let three = '';
  let five = '';
  for (let i = 3; i < 6; i++) {
    const num = sorted[i];
    const sharesWithFour = getSharedSegments(num, four);
    if (sharesWithFour === 2) {
      two = num;
      continue;
    }

    const sharesWithSix = getSharedSegments(num, six);
    if (sharesWithSix === 5) {
      five = num;
      continue;
    }

    three = num;
  }

  const decoded = [
    zero,
    one,
    two,
    three,
    four,
    five,
    six,
    sorted[1],
    sorted[9],
    nine,
  ];

  const o = [];

  entry.outputs.forEach((output) => {
    const index = decoded.indexOf(alphaSort(output));
    o.push(index);
  });

  outputVals.push(parseInt(o.join(''), 10));
});

const sum = outputVals.reduce((prev, curr) => prev + curr, 0);

console.log(sum);
