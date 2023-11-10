import { IValidateCells } from "../interfaces";
import { validateColumns } from "./columns";
import { validateRange } from "./range";

export function validateCells(params: IValidateCells): string[] {
    const { validations, sheetData, workbook, isSheet } = params;

    if (!validations) return [];

    let errors: string[] = [];

    try {
        if (!!validations && typeof validations !== "object") {
            const error: string = `invalid validations this is not a objet is a ${typeof validations}`;
            errors.push(error);
            throw error;
        };

        const { cells, columns } = validations;

        const validatedColumns = validateColumns({ errors, sheetData, columns, isSheet });

        const validatedCellsSheet = validateRange({ errors, workbook, cells });

        if (validatedCellsSheet.length) errors = errors.concat(validatedCellsSheet);
        if (validatedColumns.length) errors = errors.concat(validatedColumns)

        return errors;
    } catch (error) {
        return errors;
    };
};
