import * as ExcelJS from 'exceljs';
import { z } from 'zod';

type TData = {
	pathFile: string;
	filename: string;
	pathname: string;
};

export interface ICreateResultData {
	data: ExcelJS.Buffer;
	invalid: {
		report: ExcelJS.Buffer | Buffer;
		items: IInvalidRowDetail[];
	};
}

export interface IReturnHandler {
	status: boolean;
	data?: TData | ICreateResultData | undefined;
	error?: string | undefined | any[];
}

export type TSheetData = {
	sheetName: string;
	data: object[];
	columnsHeader: object[];
	schema?: z.ZodSchema;
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

export /*bundle*/ interface IParamsExcel {
	pathname: string;
	options: object;
	filename: string;
	sheetData: Array<TSheetData>;
	type: 'csv' | 'xlsx';
}

export /*bundle*/ interface ISheet {
	[sheetName: string]: any[];
}

export /*bundle*/ interface IValidateCells {
	validations: TCellsValidations;
	sheetData: ISheet | object[];
	workbook: ExcelJS.Workbook;
	isSheet: boolean;
}

export /*bundle*/ interface IInvalidRowDetail {
	item: object;
	error: string;
}

export /*bundle*/ interface IReturnRead {
	status: boolean;
	data?: ISheet | undefined | object[];
	invalidRows?: IInvalidRowDetail[] | Record<string, IInvalidRowDetail[]>;
	error?: string | undefined | any[];
	success?: number;
	failure?: number;
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
