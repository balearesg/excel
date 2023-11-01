import * as Excel from "exceljs";

type TData = {
    pathFile: string;
    filename: string;
    pathname: string;
};
export interface IReturnHandler {
    status: boolean;
    data?: TData | undefined;
    error?: string | undefined | any[];

}

export type TSheetData = {
    sheetName: string;
    data: object[];
    columnsHeader: object[];
};

type TDataType = 'string' | 'number' | 'boolean' | 'date' // Tipo de datos (opcional)

export interface ICellRangeValidation {
    sheetName: string;
    startRow: number;
    endRow: number;
    startCol: number;
    endCol: number;
    dataType?: TDataType;
    regexPattern?: RegExp; // Patrón de expresión regular (opcional)
}
export interface IColumnValidation {
    sheetName: string;
    columnKey: string;
    dataType?: TDataType;
    regexPattern?: RegExp; // Patrón de expresión regular (opcional)
};

type TCellsValidations = {
    columnValidations: IColumnValidation[];
    cellRangeValidations: ICellRangeValidation[];
}

export interface IParamsExcel {
    pathname: string;
    options: object;
    filename: string;
    sheetData: Array<TSheetData>;
    cellsValidations?: TCellsValidations
};

export interface IValidateCells {
    cellsValidations: TCellsValidations;
    sheetData: Array<TSheetData>;
    workbook: Excel.Workbook;
};