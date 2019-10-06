import path from 'path';
import fs from 'fs';

export type renderModeType = 'console' | 'file';

export function Render(words: string[], renderMode: renderModeType = 'console') {
    let i: number = 1;
    let response = '';
    for (const word of words) {
        response += `${i}: ${word} \n`;
        i++;
    }

    if (renderMode === 'console') {
        console.log(response);
    }

    if (renderMode === 'file') {
        writeToFile(response);
    }
}

export async function writeToFile(string: string, location: string = path.join(__dirname, '../out.txt')) {
    return new Promise((resolve, reject) => {
        fs.writeFile(location, string, (err) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(true);
        });
    });

}

export function isFizz(number: number): boolean {
    if (number % 3 === 0) {
        return true;
    }
    return false;
}

export function isBuzz(number: number): boolean {
    if (number % 5 === 0) {
        return true;
    }
    return false;
}

export interface IGetWordConfig {
    withErrors?: boolean;
    slow?: boolean;
}
