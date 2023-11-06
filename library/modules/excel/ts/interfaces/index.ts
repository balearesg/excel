import * as ExcelJS from "exceljs";

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
    regexPattern?: string; // Patrón de expresión regular (opcional)
}
export interface IColumnValidation {
    sheetName: string;
    columnKey: string;
    dataType?: TDataType;
    regexPattern?: string; // Patrón de expresión regular (opcional)
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
    type: "csv" | "xlsx"
};

export interface ISheet { [sheetName: string]: any[][] }

export interface IValidateCells {
    cellsValidations: TCellsValidations;
    sheetData: ISheet;
    workbook: ExcelJS.Workbook;
};

export interface IReturnRead {
    status: boolean;
    data?: ISheet | undefined;
    error?: string | undefined | any[];
};

export interface IParamsRead {
    filePath: string;
    cellsValidations?: TCellsValidations,
    type: "csv" | "xlsx"
}