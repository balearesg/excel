import * as ExcelJS from "exceljs";
import { IParamsExcel, IParamsRead, IReturnHandler, IReturnRead } from "./interfaces";
import { read } from "./read";
import { create } from "./create";

export class /*bundle*/ Excel {

    #columnsHeader: object[] = [];
    #workbook: ExcelJS.Workbook = new ExcelJS.Workbook();

    get columnsHeader(): object[] {
        return this.#columnsHeader;
    }

    set columnsHeader(columnsHeader: object[]) {
        this.#columnsHeader = columnsHeader;
    }

    get workbook(): ExcelJS.Workbook {
        return this.#workbook;
    }

    set workbook(workbook: ExcelJS.Workbook) {
        this.#workbook = workbook;
    }

    create(params: IParamsExcel): Promise<IReturnHandler> {
        return create(this, params)
    };

    read(params: IParamsRead): Promise<IReturnRead> {
        return read(this, params)
    };
}
