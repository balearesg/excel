import { IReturnHandler, IValidateCells } from "../interfaces";
import { validateColumns } from "./columns";
import { validateRange } from "./range";

export function validateCells(params: IValidateCells): string[] {
    const { cellsValidations, sheetData, workbook } = params;

    if (!cellsValidations) return [];

    let errors: string[] = [];

    try {
        if (!!cellsValidations && typeof cellsValidations !== "object") {
            const error: string = `invalid cellsValidations this is not a objet is a ${typeof cellsValidations}`;
            errors.push(error);
            throw error;
        };

        const { columnValidations, cellRangeValidations } = cellsValidations;

        validateColumns({ errors, sheetData, columnValidations });

        validateRange({ errors, workbook, cellRangeValidations });

        return errors;
    } catch (error) {
        return errors;
    };
};
