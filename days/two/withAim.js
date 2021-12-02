const data = require("./data");

const parseInstruction = (str, aim) => {
  const split = str.split(" ");
  const dir = split[0];
  const amount = parseInt(split[1], 10);

  if (dir === "forward") {
    return { x: amount, y: amount * aim, aim: 0 };
  }
  if (dir === "down") {
    return { x: 0, y: 0, aim: amount };
  }
  return { x: 0, y: 0, aim: -amount };
};

const pos = { x: 0, y: 0 };
let aim = 0;
data.forEach((instruction) => {
  const change = parseInstruction(instruction, aim);
  pos.x += change.x;
  pos.y += change.y;
  aim += change.aim;
});

console.log(pos.x * pos.y);
