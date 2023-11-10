import * as ExcelJS from "exceljs";
import { Excel } from "..";

export function getSheet(parent: Excel, sheet: string): object[] {

    const sheetData: any[] = [];
    // Obtener la hoja específica por su nombre
    const worksheet = parent.workbook.getWorksheet(sheet);

    if (!worksheet) throw new Error("sheet not found");
    const headerRow: ExcelJS.Row = worksheet.getRow(1);

    worksheet.eachRow((row, rowNumber) => {

        if (rowNumber === 1) return; // Saltar la fila de cabecera

        const rowData: any = {};

        row.eachCell((cell: ExcelJS.Cell, colNumber: number): void => {
            const headerCell: ExcelJS.Cell = headerRow.getCell(colNumber);
            rowData[headerCell.value.toString()] = cell.value;

        });

        sheetData.push(rowData);
    });

    return sheetData
};