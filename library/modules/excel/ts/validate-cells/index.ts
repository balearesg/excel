import { IReturnHandler, IValidateCells } from "../interfaces";
import { validateColumns } from "./columns";
import { validateRange } from "./range";

export function validateCells(params: IValidateCells): string[] {
    const { validations, sheetData, workbook } = params;

    if (!validations) return [];

    let errors: string[] = [];

    try {
        if (!!validations && typeof validations !== "object") {
            const error: string = `invalid validations this is not a objet is a ${typeof validations}`;
            errors.push(error);
            throw error;
        };

        const { cells, columns } = validations;

        validateColumns({ errors, sheetData, columns });

        validateRange({ errors, workbook, cells });

        return errors;
    } catch (error) {
        return errors;
    };
};
