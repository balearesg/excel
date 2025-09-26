import * as ExcelJS from 'exceljs';

type TData = {
	pathFile: string;
	filename: string;
	pathname: string;
};

export interface IInvalidRowDetail {
	item: object;
	error: string;
}

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
	message?: string;
}
