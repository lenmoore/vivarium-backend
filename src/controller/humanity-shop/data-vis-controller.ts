import * as fs from 'fs';
import { Request, Response } from 'express';
import * as csv from 'convert-csv-to-json';

export async function getDataVisInfo(req: Request, res: Response) {
    const fileInputName = 'src/controller/humanity-shop/data.csv';
    const fileOutputName = __dirname + '/myOutputFile.json';

    csv.generateJsonFileFromCsv(fileInputName, fileOutputName);

    return res.sendFile(fileOutputName);
}
