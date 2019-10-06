import { FizzBuzz } from './FizzBuzz';
import { Render } from './Util';
console.log('It works!');


async function main() {

  let startTime = process.hrtime();
  Render(FizzBuzz.getRandomWordsSync()); // Excersise 1
  let hrend = process.hrtime(startTime);
  console.log(`Excersise 1 Execution time: ${hrend}ms \n\n`);


  startTime = process.hrtime();
  Render(FizzBuzz.getFizzBuzzWordsSync()); // Excersise 2
  hrend = process.hrtime(startTime);
  console.log(`Excersise 2 Execution time: ${hrend}ms \n\n`);

  startTime = process.hrtime();
  Render(FizzBuzz.getFizzBuzzWordsSync(100, {withErrors: true})); // Excersise 2.1 with errors
  hrend = process.hrtime(startTime);
  console.log(` Excersise 2.1 with errors Execution time: ${hrend}ms \n\n`);


  startTime = process.hrtime();
  Render(await FizzBuzz.getRandomWordsAsync(100));  // Excersise 3.1
  hrend = process.hrtime(startTime);
  console.log(`Excersise 3.1 Execution time: ${hrend}ms \n\n`);

  startTime = process.hrtime();
  Render(await FizzBuzz.getFizzBuzzWordsAsync(100)); // Excersise 3.2
  hrend = process.hrtime(startTime);
  console.log(`Excersise 3.2 Execution time: ${hrend}ms \n\n`);

  startTime = process.hrtime();
  Render(await FizzBuzz.getFizzBuzzWordsAsync(100, {withErrors: true})); // Excersise 4
  hrend = process.hrtime(startTime);
  console.log(`Excersise 4 Execution time: ${hrend}ms \n\n`);

  startTime = process.hrtime();
  Render(await FizzBuzz.getFizzBuzzWordsAsync(100, {slow: true})); // With Slow :true
  hrend = process.hrtime(startTime);
  console.log(`Excersise With Slow :true Execution time: ${hrend}ms \n\n`);

  startTime = process.hrtime();
  // With Slow: true and withErrors: true
  Render(await FizzBuzz.getFizzBuzzWordsAsync(100, {slow: true, withErrors: true}));
  hrend = process.hrtime(startTime);
  console.log(`Excersise With Slow: true and withErrors: true Execution time: ${hrend}ms \n\n`);


  startTime = process.hrtime();
  // Write to file With Slow: true and withErrors: true
  Render(await FizzBuzz.getFizzBuzzWordsAsync(100, {slow: true, withErrors: true}), 'file');
  hrend = process.hrtime(startTime);
  console.log(`Excersise Write to file With Slow: true and withErrors: true Execution time: ${hrend}ms \n\n`);


}

main();
