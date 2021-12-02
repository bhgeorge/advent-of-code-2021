const data = require("./data");

const parseInstruction = (str) => {
  const split = str.split(" ");
  const dir = split[0];
  const amount = parseInt(split[1], 10);

  if (dir === "forward") {
    return { x: amount, y: 0 };
  }
  if (dir === "down") {
    return { x: 0, y: amount };
  }
  return { x: 0, y: -amount };
};

const pos = { x: 0, y: 0 };
data.forEach((instruction) => {
  const change = parseInstruction(instruction);
  pos.x += change.x;
  pos.y += change.y;
});

console.log(pos.x * pos.y);
