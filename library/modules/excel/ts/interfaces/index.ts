import * as ExcelJS from 'exceljs';
import { z } from 'zod';

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

type TDataType = 'string' | 'number' | 'boolean' | 'date'; // Tipo de datos (opcional)

export interface ICellRangeValidation {
	startRow: number;
	endRow: number;
	startCol: number;
	endCol: number;
	type?: TDataType;
	regex?: string; // Patrón de expresión regular (opcional)
}
export interface IColumnValidation {
	key: string;
	type?: TDataType;
	regex?: string; // Patrón de expresión regular (opcional)
}

type TCellsValidations = {
	columns: Array<{
		sheet: string;
		items: IColumnValidation[];
	}>;
	cells: Array<{
		sheet: string;
		items: ICellRangeValidation[];
	}>;
};

export interface IParamsExcel {
	pathname: string;
	options: object;
	filename: string;
	sheetData: Array<TSheetData>;
	type: 'csv' | 'xlsx';
}

export interface ISheet {
	[sheetName: string]: any[];
}

export interface IValidateCells {
	validations: TCellsValidations;
	sheetData: ISheet | object[];
	workbook: ExcelJS.Workbook;
	isSheet: boolean;
}

export interface IInvalidRowDetail {
	item: object;
	error: string;
}

export interface IReturnRead {
	status: boolean;
	data?: ISheet | undefined | object[];
	invalidRows?: IInvalidRowDetail[] | Record<string, IInvalidRowDetail[]>;
	error?: string | undefined | any[];
}

export interface IParamsRead {
	buffer: ExcelJS.Buffer;
	schema?: z.ZodSchema;
	type: 'csv' | 'xlsx';
	sheet: string;
}

export interface IValidateValues {
	validate: { [x: string]: string };
	toValidate: any;
	entity: string;
}

export interface IParamsValidateColumns {
	columns: Array<{
		sheet: string;
		items: IColumnValidation[];
	}>;
	errors: string[];
	sheetData: ISheet | object[];
	isSheet: boolean;
}

export interface IParamsValidateRange {
	cells: Array<{
		sheet: string;
		items: ICellRangeValidation[];
	}>;
	errors: string[];
	workbook: ExcelJS.Workbook;
}
