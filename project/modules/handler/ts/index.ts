import * as Excel from "exceljs";
import * as path from "path";
import * as fs from "fs";
import { IParamsExcel, IReturnHandler } from "./interfaces";
import { validateCells } from "./validate-cells";

export class /*bundle*/ ExcelHandler {

    #columnsHeader: object[] = [];
    #workbook: Excel.Workbook = new Excel.Workbook();

    get columnsHeader(): object[] {
        return this.#columnsHeader;
    }

    set columnsHeader(columnsHeader: object[]) {
        this.#columnsHeader = columnsHeader;
    }

    get workbook(): Excel.Workbook {
        return this.#workbook;
    }

    set workbook(workbook: Excel.Workbook) {
        this.#workbook = workbook;
    }

    /***
     The `createExcel` method is an asynchronous function that takes in an object `params` as a
    parameter. This method is responsible for creating an Excel file based on the provided parameters. 
    * @param {IParamsExcel} params 
    * @returns {IReturnHandler} - objet with status and data 
    */
    async createExcel(params: IParamsExcel): Promise<IReturnHandler> {

        if (typeof params !== "object") throw `invalid params, this is not object is ${typeof params}`;

        const { pathname, options, filename, sheetData, cellsValidations } = params;

        if (!pathname) throw "invalid pathname, this is required";

        if (typeof pathname !== "string") throw `invalid pathname, this is not string is ${typeof pathname}`;

        if (!filename) throw "invalid filename, this is required";

        if (typeof filename !== "string") throw `invalid filename, this is not string is ${typeof filename}`;

        if (!sheetData) throw "invalid sheetData, this is required";

        if (typeof sheetData !== "object") throw `invalid sheetData, this is not object is ${typeof sheetData}`;

        const outputPath = path.join(__dirname, pathname);
        // Verifica y crea el directorio si no existe
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        };

        try {

            this.#workbook = new Excel.Workbook();

            this.#workbook.views = [
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

                if (typeof sheet !== "object") throw `invalid sheet, this is not object is ${typeof sheet}`;

                const { sheetName, data, columnsHeader } = sheet;

                if (!sheetName) throw "invalid sheetName in sheetData, this is required";

                if (typeof sheetName !== "string") throw `invalid sheetName in sheetData, this is not string is ${typeof sheetName}`;

                if (!data) throw "invalid data in sheetData, this is required";

                if (!Array.isArray(data) || !data.length) throw `invalid data in sheetData, this is not array or data without content`;

                if (!columnsHeader) throw "invalid columnsHeader in sheetData, this is required";

                if (!Array.isArray(columnsHeader) || !columnsHeader.length) throw `invalid columnsHeader in sheetData, this is not array or columnsHeader without content`;

                const worksheet: Excel.Worksheet = this.#workbook.addWorksheet(sheetName);

                worksheet.columns = columnsHeader;
                worksheet.state = "visible";

                data.forEach((item: object): void => {
                    worksheet.addRow(item);
                });
                worksheet.addRow([]);

                // Antes de guardar el archivo Excel, realizamos las validaciones
                const validationErrors = validateCells({ cellsValidations, sheetData, workbook: this.#workbook });
                if (!!validationErrors.length) {
                    return { status: false, error: validationErrors };
                }

            }
            const pathFile: string = path.join(outputPath, filename);
            await this.#workbook.xlsx.writeFile(pathFile, options);

            return { status: true, data: { pathFile, filename, pathname } };
        } catch (error: any) {
            return { status: false, error };
        }
    };

}
