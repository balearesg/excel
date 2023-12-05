import * as ExcelJS from "exceljs";
import * as path from "path";
import * as fs from "fs";
import { Excel } from "..";
import { IParamsExcel, IReturnHandler } from "../interfaces";
import { validateValues } from "../utils/validate-values";

/***
    The `createExcel` method is an asynchronous function that takes in an object `params` as a
   parameter. This method is responsible for creating an Excel file based on the provided parameters. 
   * @param {IParamsExcel} params 
   * @returns {IReturnHandler} - objet with status and data 
   */
export async function create(parent: Excel, params: IParamsExcel): Promise<IReturnHandler> {

    let errors = [];

    const validated = validateValues({
        validate: {
            pathname: "string",
            filename: "string",
            sheetData: "array",
            type: "string"
        }, toValidate: params,
        entity: "params"
    });

    if (validated.length) {
        errors = errors.concat(validated);
        throw new Error(errors[0])
    };

    const { pathname, options, filename, sheetData, type } = params;

    const types = ["xlsx", "csv"];

    if (!types.includes(type)) throw new Error(`Type must be xlsx or csv`);

    const fileExtension = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);

    if (!fileExtension) throw new Error(`The filename does not have an extension`);

    if (!types.includes(fileExtension)) throw new Error(`The file extension must be csv or xlsx in filename`);

    if (fileExtension !== type) throw new Error(`The file extension in filename must be equal to the parameter type`)

    const outputPath = path.join(__dirname, pathname);
    // Verifica y crea el directorio si no existe
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    };

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

            const validated = validateValues({
                validate: {
                    sheetName: "string",
                    data: "array",
                }, toValidate: sheet,
                entity: "sheetData"
            });

            if (validated.length) {
                errors = errors.concat(validated);
                return { status: false, error: errors };
            };

            const { sheetName, data, columnsHeader } = sheet;
            const worksheet: ExcelJS.Worksheet = parent.workbook.addWorksheet(sheetName);

            if (!!columnsHeader && !!Array.isArray(columnsHeader) && !!columnsHeader.length) {
                worksheet.columns = columnsHeader;
            };

            worksheet.state = "visible";
            worksheet.name = sheetName

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