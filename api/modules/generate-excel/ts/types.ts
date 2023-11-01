type TData = {
    pathFile: string;
    filename: string;
    pathname: string;
};
export interface IReturnHandler {
    status: boolean;
    data?: TData | undefined;
    error?: string | undefined;

};