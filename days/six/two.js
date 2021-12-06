const data = require('./data');

let fish = [...data];

let fishPerDay = new Array(9).fill(0);

fish.forEach((f) => {
  fishPerDay[`${f}`] += 1;
});

const processDay = () => {
  const newFishPerDay = Array(9).fill(0);
  fishPerDay.forEach((count, i) => {
    if (i === 0) {
      newFishPerDay[8] += count;
      newFishPerDay[6] += count;
    } else {
      newFishPerDay[i - 1] += count;
    }
  });
  fishPerDay = newFishPerDay;
};

for (let i = 0; i < 256; i++) {
  processDay();
}

const sum = fishPerDay.reduce((p, c) => p + c);

console.log(sum);
