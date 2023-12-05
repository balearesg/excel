import * as fs from 'fs';
import * as csv from 'csv-parser';
export async function readCSVFile(params): Promise<any> {

    const { filePath } = params;
    const data: any[] = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                data.push(row)
            })
            .on('end', () => {
                resolve({ status: true, data });
            })
            .on('error', (error) => {
                reject({ status: false, error });
            });
    });

}