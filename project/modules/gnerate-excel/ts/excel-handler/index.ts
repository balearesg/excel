import * as Excel from "exceljs";
import * as path from "path";
import * as fs from "fs";
import { IReturnHandler } from "./types";

interface IParamsExcel {
    pathname: string;
    options: object;
    filename: string;
    sheetData: Array<{
        sheetName: string;
        data: object[];
        columnsHeader: any;
    }>;
}

export class ExcelHandler {
    private _columnsHeader: object[] = [];
    private _workbook: Excel.Workbook;

    get columnsHeader() {
        return this._columnsHeader;
    }

    set columnsHeader(columnsHeader) {
        this._columnsHeader = columnsHeader;
    }

    get workbook() {
        return this._workbook;
    }

    set workbook(workbook) {
        this._workbook = workbook;
    }

    /***
     The `createExcel` method is an asynchronous function that takes in an object `params` as a
    parameter. This method is responsible for creating an Excel file based on the provided parameters. 
    * @param {IParamsExcel} params 
    * @returns {IReturnHandler} - objet with status and data 
    */
    async createExcel(params: IParamsExcel): Promise<IReturnHandler> {
        const { pathname, options, filename, sheetData } = params;

        const outputPath = path.join(__dirname, pathname);
        // Verifica y crea el directorio si no existe
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        };

        try {
            const workbook = new Excel.Workbook();
            this._workbook = workbook;

            workbook.views = [
                {
                    x: 0,
                    y: 0,
                    width: 10000,
                    height: 20000,
                    firstSheet: 0,
                    activeTab: 1,
                    visibility: "visible",
                },
            ];

            for (const sheet of sheetData) {
                const { sheetName, data, columnsHeader } = sheet;

                const worksheet = workbook.addWorksheet(sheetName);

                worksheet.columns = columnsHeader;
                worksheet.state = "visible";

                data.forEach((item) => {
                    worksheet.addRow(item);
                });
                worksheet.addRow([]);
            }
            const pathFile = path.join(outputPath, filename);
            await workbook.xlsx.writeFile(pathFile, options);

            return { status: true, data: { pathFile, filename, pathname } };
        } catch (error) {
            return { status: false, error };
        }
    };

}
