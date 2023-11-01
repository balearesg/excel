type TData = {
    pathFile: string;
    filename: string;
    pathname: string;
};
export interface IReturnHandler {
    status: boolean;
    data?: TData | undefined;
    error?: string | undefined;

}

export type TSheetData = {
    sheetName: string;
    data: object[];
    columnsHeader: object[];
}
export interface IParamsExcel {
    pathname: string;
    options: object;
    filename: string;
    sheetData: Array<TSheetData>;
}