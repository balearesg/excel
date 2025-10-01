import * as ExcelJS from "exceljs";
import { IParamsExcel, IParamsRead, IReturnHandler, IReturnRead } from "./interfaces";
import { read } from "./read";
import { create } from "./create";

export class /*bundle*/ Excel {

    #workbook: ExcelJS.Workbook = new ExcelJS.Workbook();

    get workbook(): ExcelJS.Workbook {
        return this.#workbook;
    };

    set workbook(workbook: ExcelJS.Workbook) {
        this.#workbook = workbook;
    };

    create(params: IParamsExcel): Promise<IReturnHandler> {
        return create(this, params);
    };

    read(params: IParamsRead): Promise<IReturnRead> {
        return read(this, params);
    };
};
