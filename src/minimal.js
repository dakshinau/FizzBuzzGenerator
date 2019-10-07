const { getRandomWord, getRandomWordSync } = require("word-maker");

const getFizzBuzz = i => {
  let word = "";
  if (i % 3 === 0) {
    word = "Fizz";
  }
  if (i % 5 === 0) {
    word += "Buzz";
  }
  return word;
};

const getWodSync = (options = { withErrors: false }) => {
  let word = "";
  try {
    word = getRandomWordSync(options);
  } catch (e) {
    word = "It shouldn't break anything!";
  }
  return word;
};

const awaitWord = async (i, options = { withErrors: false, slow: false }) => {
  let word = "";
  try {
    word = await getRandomWord(options);
  } catch (e) {
    word = "It shouldn't break anything!";
  }
  return `${i}: ${word} \n`;
};

const promisifyFizzBuzz = async (i, word) => {
  return new Promise((resolve, reject) => {
    resolve(`${i}: ${word} \n`);
  });
};

const main = async () => {
  let promises = [];
  const numberOfWords = 100;

  let startTime = process.hrtime();
  // Ex: 1
  let out = "";
  for (let i = 1; i <= numberOfWords; i++) {
    out += `${i}: ${getRandomWordSync()} \n`;
  }
  console.log(out);
  let hrend = process.hrtime(startTime);
  console.log(`Ex: 1 Execution time: ${hrend}ms \n\n`);

  startTime = process.hrtime();
  // Ex: 2
  out = "";
  for (let i = 1; i <= numberOfWords; i++) {
    let fizzBuzz = getFizzBuzz(i);
    out += `${i}: ${fizzBuzz.length > 0 ? fizzBuzz : getRandomWordSync()} \n`;
  }
  console.log(out);
  hrend = process.hrtime(startTime);
  console.log(`Ex: 2 Execution time: ${hrend}ms \n\n`);

  startTime = process.hrtime();
  // Ex: 2.1 with errors on
  out = "";
  for (let i = 1; i <= numberOfWords; i++) {
    let fizzBuzz = getFizzBuzz(i);
    out += `${i}: ${fizzBuzz.length > 0 ? fizzBuzz : getWodSync({ withErrors: true })} \n`;
  }
  console.log(out);

  hrend = process.hrtime(startTime);
  console.log(`Ex: 2.1 Execution time: ${hrend}ms \n\n`);

  startTime = process.hrtime();
  // Ex: 3.1
  promises = [];
  for (let i = 1; i <= numberOfWords; i++) {
    promises.push(awaitWord(i));
  }

  console.log((await Promise.all(promises)).join(""));

  hrend = process.hrtime(startTime);
  console.log(`Ex: 3.1 Execution time: ${hrend}ms \n\n`);

  startTime = process.hrtime();
  // Ex: 3.2
  promises = [];
  for (let i = 1; i <= numberOfWords; i++) {
    let fizzBuzz = getFizzBuzz(i);
    promises.push(fizzBuzz.length > 0 ? promisifyFizzBuzz(i, fizzBuzz) : awaitWord(i));
  }
  console.log((await Promise.all(promises)).join(""));

  hrend = process.hrtime(startTime);
  console.log(`Ex: 3.2 Execution time: ${hrend}ms \n\n`);

  startTime = process.hrtime();
  // Ex: 4
  promises = [];
  for (let i = 1; i <= numberOfWords; i++) {
    let fizzBuzz = getFizzBuzz(i);
    promises.push(fizzBuzz.length > 0 ? promisifyFizzBuzz(i, fizzBuzz) : awaitWord(i, { withErrors: true }));
  }
  console.log((await Promise.all(promises)).join(""));

  hrend = process.hrtime(startTime);
  console.log(`Ex: 4 Execution time: ${hrend}ms \n\n`);

  startTime = process.hrtime();
  // Ex: With slow
  promises = [];
  for (let i = 1; i <= numberOfWords; i++) {
    let fizzBuzz = getFizzBuzz(i);
    promises.push(
      fizzBuzz.length > 0 ? promisifyFizzBuzz(i, fizzBuzz) : awaitWord(i, { withErrors: true, slow: true })
    );
  }
  console.log((await Promise.all(promises)).join(""));

  hrend = process.hrtime(startTime);
  console.log(`Ex: With slow Execution time: ${hrend}ms \n\n`);
};

main();
