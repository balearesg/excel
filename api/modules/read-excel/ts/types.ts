export interface ISheet { [sheetName: string]: any[][] }
export interface IReturnRead {
    status: boolean;
    data?: ISheet | undefined;
    error?: string | undefined | any[];
};