import * as fs from 'fs';
import { Request, Response } from 'express';
import * as csv from 'convert-csv-to-json';
import c from 'config';
import { ProductInput } from '../../models/humanity-shop/product.model';
const shitString =
    '2 - Mitte eriti oluline,4 - Väga oluline,5 - Ülioluline,1 - Ebaoluline,1 - Ebaoluline,5 - Ülioluline,4 - Väga oluline,1 - Ebaoluline,\n' +
    '1 - Ebaoluline,1 - Ebaoluline,5 - Ülioluline,5 - Ülioluline,2 - Mitte eriti oluline,4 - Väga oluline,2 - Mitte eriti oluline,1 - Ebaoluline,';

const colors = {
    Roheline: 'green',
    Sinine: 'blue',
    Oranž: 'orange',
    Punane: 'red',
};
export async function getDataVisInfo(req: Request, res: Response) {
    const str =
        'Kuldsed kõrvarõngad [Roheline],Kuldsed kõrvarõngad [Sinine],Kuldsed kõrvarõngad [Punane],Kuldsed kõrvarõngad [Oranž],Piibel [Roheline],Piibel [Sinine],Piibel [Punane],Piibel [Oranž]';
    const keys = str.split(',');
    const realGoodKeys = [];
    keys.forEach((k) => {
        if (k.includes('[')) {
            const splitK = k.split('[')[0].trim();
            const inArray = realGoodKeys.find((p) => p.name === splitK);
            if (!inArray) {
                realGoodKeys.push({
                    name: splitK,
                    entries: {
                        red: [],
                        green: [],
                        blue: [],
                        orange: [],
                    },
                });
            }
        }
    });
    console.log('realgoodkeys: ', realGoodKeys.length, '>>> ', realGoodKeys);
    const contents = shitString.split('\n');
    const products = [];
    let counter = 0;

    contents.forEach((row) => {
        console.log(row);
        counter = 0;
        const rowItems = row.slice(0, -1).split(',');
        for (let i = 0; i < keys.length; i++) {
            const product = keys[i].split('[')[0].trim();
            const color = keys[i].split('[')[1].split(']')[0].trim(); // color in Estonian
            const productInList = realGoodKeys.find((p) => p.name === product);
            if (!productInList) {
                realGoodKeys.push({
                    name: product,
                    entries: {
                        red: [],
                        green: [],
                        blue: [],
                        orange: [],
                    },
                });
            }
            const colorInEnglish = colors[color];
            productInList.entries[colorInEnglish].push(rowItems[i]);
        }
    });
    console.log('>>>>>>>>>>>>>>>> >>>>>> ', realGoodKeys);

    // todo add all these products into database and then only get from there?
    // todo also add average values
    return res.send({ realGoodKeys });
}
