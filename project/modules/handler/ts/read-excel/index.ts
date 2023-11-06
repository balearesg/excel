import * as Excel from "exceljs";
import * as fs from 'fs';
import { validateCells, } from "../validate-cells";
import { IParamsRead, IReturnHandler, IReturnRead, ISheet } from "../interfaces";
import { ExcelHandler } from "..";
import { readCSVFile } from "./csv";

export async function readExcel(parent: ExcelHandler, params: IParamsRead): Promise<IReturnRead> {

    if (!params || typeof params !== "object") throw new Error("invalid params");

    const { filePath, cellsValidations, type } = params;

    if (!type) throw new Error("invalid type, this is required");

    if (!filePath) throw new Error("invalid filePath, this is required");

    if (typeof filePath !== "string") throw new Error(`invalid filePath, this is not string`);

    if (!fs.existsSync(filePath)) throw new Error("File does not exist in the specified path")


    const types: string[] = ["xlsx", "csv"];

    if (!types.includes(type)) throw new Error(`Type must be xlsx or csv`);

    let errors: any = [];

    try {
        parent.workbook = new Excel.Workbook();

        if (type === "xlsx") {
            const fileBuffer: Buffer = fs.readFileSync(filePath);
            await parent.workbook.xlsx.load(fileBuffer);
        }
        if (type === "csv") {
            return readCSVFile(params)
        }

        const dataBySheet: ISheet = {};
        parent.workbook.eachSheet((worksheet: Excel.Worksheet): void => {
            const sheetData: any[] = [];
            const headerRow: Excel.Row = worksheet.getRow(1);

            worksheet.eachRow((row: Excel.Row, rowNumber: number): void => {
                if (rowNumber === 1) return; // Saltar la fila de cabecera

                const rowData: any = {};

                row.eachCell((cell: Excel.Cell, colNumber: number): void => {
                    const headerCell: Excel.Cell = headerRow.getCell(colNumber);
                    rowData[headerCell.value.toString()] = cell.value;
                });

                sheetData.push(rowData);
            });

            dataBySheet[worksheet.name] = sheetData;
        });

        if (cellsValidations) {

            const validates: IReturnHandler[] = validateCells({ cellsValidations, workbook: parent.workbook, sheetData: dataBySheet })

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