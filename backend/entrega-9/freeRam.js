const os = require("os");
const chalk = require("chalk");

const totalMem = os.totalmem();
const freeMem = os.freemem();
const percent = ((freeMem * 100) / totalMem).toFixed(2);

console.log(
  chalk`Memoria RAM total:\t{green ${(totalMem / Math.pow(1024, 3)).toFixed(
    2
  )} Gb}`
);

console.log(
  chalk`Memoria RAM en uso:\t{green ${(
    (totalMem - freeMem) /
    Math.pow(1024, 3)
  ).toFixed(2)} Gb}`
);

console.log(chalk`Memoria RAM libre:\t{green ${percent} %}`);
