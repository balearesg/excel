import * as ExcelJS from "exceljs";
import * as fs from 'fs';
import { validateCells, } from "../validate-cells";
import { IParamsRead, IReturnRead, ISheet } from "../interfaces";
import { Excel } from "..";
import { readCSVFile } from "./csv";
import { validateValues } from "../utils/validate-values";
import { allSheet } from "./all-sheet";
import { getSheet } from "./sheet";

export async function read(parent: Excel, params: IParamsRead): Promise<IReturnRead> {

    let errors: string[] = [];

    const validated = validateValues({
        validate: {
            filePath: "string",
            type: "string",
        }, toValidate: params,
        entity: "params"
    });

    if (validated.length) {
        errors = errors.concat(validated);
        return { status: false, error: errors };
    };

    const { filePath, validations, type, sheet } = params;

    if (!fs.existsSync(filePath)) throw new Error("File does not exist in the specified path")

    const types: string[] = ["xlsx", "csv"];

    if (!types.includes(type)) throw new Error(`Type must be xlsx or csv`);

    const fileExtension: string = filePath.slice(((filePath.lastIndexOf(".") - 1) >>> 0) + 2);

    if (!fileExtension) throw new Error(`The filePath does not have an extension`);

    if (!types.includes(fileExtension)) throw new Error(`The file extension must be csv or xlsx in filePath`);

    if (fileExtension !== type) throw new Error(`The file extension in filePath must be equal to the parameter type`)

    try {

        if (type === "csv") {
            return readCSVFile(params)
        };

        parent.workbook = new ExcelJS.Workbook();

        if (type === "xlsx") {
            const fileBuffer: Buffer = fs.readFileSync(filePath);
            await parent.workbook.xlsx.load(fileBuffer);
        };

        const isSheet = !!sheet && typeof sheet === "string";

        const dataBySheet: ISheet | object[] = isSheet ? getSheet(parent, sheet) : allSheet(parent);

        if (validations) {

            const validates: string[] = validateCells({ validations, workbook: parent.workbook, sheetData: dataBySheet, isSheet })

            if (validates.length) {
                errors = errors.concat(validates);
                throw new Error("cells invalid")
            };
        }
        return { status: true, data: dataBySheet };

    } catch (error) {
        return { status: false, error: errors.length ? errors : error };
    }

}