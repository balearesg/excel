import * as ExcelJS from "exceljs";
import * as path from "path";
import * as fs from "fs";
import { Excel } from "..";
import { IParamsExcel, IReturnHandler } from "../interfaces";

/***
    The `createExcel` method is an asynchronous function that takes in an object `params` as a
   parameter. This method is responsible for creating an Excel file based on the provided parameters. 
   * @param {IParamsExcel} params 
   * @returns {IReturnHandler} - objet with status and data 
   */
export async function create(parent: Excel, params: IParamsExcel): Promise<IReturnHandler> {

    if (!params) throw new Error(`invalid params, this is invalid`);

    if (typeof params !== "object") throw new Error(`invalid params, this is not object`);

    const { pathname, options, filename, sheetData, type } = params;

    if (!pathname) throw new Error("invalid pathname, this is required");

    if (typeof pathname !== "string") throw new Error(`invalid pathname, this is not string`);


    if (!filename) throw new Error("invalid filename, this is required");

    if (typeof filename !== "string") throw new Error(`invalid filename, this is not string`);

    if (!sheetData) throw new Error("invalid sheetData, this is required");

    if (typeof sheetData !== "object") throw new Error(`invalid sheetData, this is not object`);

    if (!type) throw new Error("invalid type, this is required");

    if (typeof type !== "string") throw new Error(`invalid type, this is not string`);

    const types = ["xlsx", "csv"];

    if (!types.includes(type)) throw new Error(`Type must be xlsx or csv`);

    const outputPath = path.join(__dirname, pathname);
    // Verifica y crea el directorio si no existe
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    };
    let errors = []
    try {

        parent.workbook = new ExcelJS.Workbook();

        parent.workbook.views = [
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

            const worksheet: ExcelJS.Worksheet = parent.workbook.addWorksheet(sheetName);

            if (!!columnsHeader && !!Array.isArray(columnsHeader) && !!columnsHeader.length) {
                worksheet.columns = columnsHeader;
                continue
            };

            worksheet.state = "visible";

            data.forEach((item: object): void => {
                worksheet.addRow(item);
            });
            worksheet.addRow([]);

        };

        const pathFile: string = path.join(outputPath, filename);
        await parent.workbook[type].writeFile(pathFile, options);

        return { status: true, data: { pathFile, filename, pathname } };
    } catch (error: any) {
        return { status: false, error: errors.length ? errors : error };
    }
};