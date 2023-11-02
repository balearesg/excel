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

        if (!params) throw new Error(`invalid params, this is invalid`);

        if (typeof params !== "object") throw new Error(`invalid params, this is not object`);

        const { pathname, options, filename, sheetData, cellsValidations } = params;

        if (!pathname) throw new Error("invalid pathname, this is required");

        if (typeof pathname !== "string") throw new Error(`invalid pathname, this is not string`);

        if (!filename) throw new Error("invalid filename, this is required");

        if (typeof filename !== "string") throw new Error(`invalid filename, this is not string`);

        if (!sheetData) throw new Error("invalid sheetData, this is required");

        if (typeof sheetData !== "object") throw new Error(`invalid sheetData, this is not object`);

        const outputPath = path.join(__dirname, pathname);
        // Verifica y crea el directorio si no existe
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        };
        let errors = []
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

                if (typeof sheet !== "object") throw new Error(`invalid sheet, this is not object`);

                const { sheetName, data, columnsHeader } = sheet;

                if (!sheetName) throw new Error("invalid sheetName in sheetData, this is required");

                if (typeof sheetName !== "string") throw new Error(`invalid sheetName in sheetData, this is not string`);

                if (!data) throw new Error("invalid data in sheetData, this is required");

                if (!Array.isArray(data) || !data.length) throw new Error(`invalid data in sheetData, this is not array or data without content`);

                if (!columnsHeader) throw new Error("invalid columnsHeader in sheetData, this is required");

                if (!Array.isArray(columnsHeader) || !columnsHeader.length) throw new Error(`invalid columnsHeader in sheetData, this is not array or columnsHeader without content`);

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
                    errors = errors.concat(validationErrors)
                    throw new Error("errors in cells");
                }

            };

            const pathFile: string = path.join(outputPath, filename);
            await this.#workbook.xlsx.writeFile(pathFile, options);

            return { status: true, data: { pathFile, filename, pathname } };
        } catch (error: any) {
            return { status: false, error: errors.length ? errors : error };
        }
    };

}
