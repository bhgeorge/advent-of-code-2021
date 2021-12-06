const data = require('./data');

let fish = [...data];

const processDay = () => {
  const newFish = [];
  fish.forEach((f) => {
    if (f === 0) {
      newFish.push(6), newFish.push(8);
    } else {
      newFish.push(f - 1);
    }
  });
  fish = newFish;
};

for (let i = 0; i < 80; i++) {
  processDay();
}

console.log(fish.length);
