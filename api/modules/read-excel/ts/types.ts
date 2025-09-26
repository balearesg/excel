export interface ISheet {
	[sheetName: string]: any[][];
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
