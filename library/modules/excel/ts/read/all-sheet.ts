import * as ExcelJS from "exceljs";
import { Excel } from "..";
import { ISheet } from "../interfaces";

export function allSheet(parent: Excel): ISheet {
    const dataBySheet: ISheet = {};

    parent.workbook.eachSheet((worksheet: ExcelJS.Worksheet): void => {

        const sheetData: any[] = [];
        const headerRow: ExcelJS.Row = worksheet.getRow(1);

        worksheet.eachRow((row: ExcelJS.Row, rowNumber: number): void => {
            if (rowNumber === 1) return; // Saltar la fila de cabecera

            const rowData: any = {};

            row.eachCell((cell: ExcelJS.Cell, colNumber: number): void => {
                const headerCell: ExcelJS.Cell = headerRow.getCell(colNumber);
                rowData[headerCell.value.toString()] = cell.value;
            });

            sheetData.push(rowData);
        });

        dataBySheet[worksheet.name] = sheetData;
    });
    return dataBySheet
};