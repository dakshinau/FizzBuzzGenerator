import { isFizz, isBuzz, IGetWordConfig  } from './Util';
const { getRandomWordSync, getRandomWord } = require('word-maker');


export function generateFizzBuzz(number: number): string {
    let word = '';
    if (isFizz(number)) {
        word = 'Fizz';
    }
    if (isBuzz(number)) {
        word += 'Buzz';
    }
    return word;
}

export class FizzBuzz {

    private static getRandomWordSync: typeof getRandomWordSync  = getRandomWordSync;
    private static getRandomWord: typeof getRandomWord  = getRandomWord;

    /**
     * Handle errors and wait for return when slow mode is true
     *
     * @private
     * @static
     * @param {IGetWordConfig} [config={ withErrors: false, slow: false}]
     * @returns {Promise<string>}
     * @memberof FizzBuzz
     */
    private static async getWord(config: IGetWordConfig = { withErrors: false, slow: false}): Promise<string> {
        try {
            return await this.getRandomWord(config);
        } catch (e) {
            if (config.withErrors) {
                return 'It shouldn\'t break anything!';
            }
            throw e;
        }
    }

    private static getWordSync(config = {withErrors: false}) {
        let word = '';
        try {
            word = this.getRandomWordSync(config);
        } catch (err) {
            word = 'It shouldn\'t break anything!';
        }
        return word;
    }

    /**
     * Promisify getFizzBuzzWord
     *
     * @private
     * @static
     * @param {number} number
     * @returns {Promise<string>}
     * @memberof FizzBuzz
     */
    private static getFizzBuzzWordAsync(number: number): Promise<string> {
        return Promise.resolve(generateFizzBuzz(number));
    }



    /**
     * Generate 100 Random Words (Sync)
     *
     * @static
     * @param {number} [count=100]
     * @returns {string[]}
     * @memberof FizzBuzz
     */
    public static getRandomWordsSync(count: number = 100, options = {withErrors: false}): string[] {
        const words: string[] = [];
        for (let i = 1; i <= count; i++) {
            words.push(this.getWordSync(options));
        }
        return words;
    }

    /**
     * Generate 100 Random Words (Async)
     *
     * @static
     * @param {number} [count=100]
     * @param {IGetWordConfig} [config={ withErrors: false, slow: false}]
     * @returns {Promise<string[]>}
     * @memberof FizzBuzz
     */
    public static getRandomWordsAsync(
        count: number = 100,
        config: IGetWordConfig = { withErrors: false, slow: false}): Promise<string[]> {
        const promises: Array<Promise<string>> = [];
        for (let i = 1; i <= count; i++) {
            promises.push(this.getWord(config));
        }
        return Promise.all(promises);
    }

    /**
     * Generate Random Words with Fizz Buzz (Sync)
     *
     * @static
     * @param {number} [count=100]
     * @returns {string[]}
     * @memberof FizzBuzz
     */
    public static getFizzBuzzWordsSync(count: number = 100, options = {withErrors: false}): string[] {
        const words: string[] = [];
        for (let i = 1; i <= count; i++) {
            if (isFizz(i) || isBuzz(i)) {
                words.push(generateFizzBuzz(i));
                continue;
            }
            words.push(this.getWordSync(options));
        }
        return words;
    }

    /**
     * Generate Random Words with Fizz Buzz (Async)
     *
     * @static
     * @param {number} [count=100]
     * @param {IGetWordConfig} [config={ withErrors: false, slow: false}]
     * @returns {Promise<string[]>}
     * @memberof FizzBuzz
     */
    public static getFizzBuzzWordsAsync(
        count: number = 100,
        config: IGetWordConfig = { withErrors: false, slow: false},
        ): Promise<string[]> {
        const promises: Array<Promise<string>> = [];
        for (let i = 1; i <= count; i++) {
            if (isFizz(i) || isBuzz(i)) {
                promises.push(this.getFizzBuzzWordAsync(i));
                continue;
            }
            promises.push(this.getWord(config));
        }
        return Promise.all(promises);
    }
}
