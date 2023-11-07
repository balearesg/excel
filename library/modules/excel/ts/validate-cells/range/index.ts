import { errorMsgs } from "../../utils/error-msgs";
import { dataTypeValidations } from "../../utils/type-validations";
import { validateValues } from "../../utils/validate-values";

export async function validateRange({ cellRangeValidations, workbook, errors }) {
    const isValidCellRangeValidations: boolean = !!cellRangeValidations && !!Array.isArray(cellRangeValidations) && !!cellRangeValidations.length;
    if (!isValidCellRangeValidations) return

    for (const rangeValidation of cellRangeValidations) {
        const { startRow, endRow, startCol, endCol, dataType, regexPattern, sheetName } = rangeValidation;
        const validated = validateValues({
            validate: {
                startRow: "number",
                endRow: "number",
                startCol: "number",
                endCol: "number",
                dataType: "string",
                sheetName: "string",
            }, toValidate: rangeValidation,
            entity: "rangeValidation"
        });
        if (validated.length) {
            errors = errors.concat(validated);
            throw "invalid rangeValidation, No valid properties"
        };
        const worksheet = workbook.getWorksheet(sheetName);


        if (!worksheet) {
            const error = `not found data with sheetName ${sheetName}`;
            errors.push(error);
            throw error;
        };

        for (let rowNum = startRow; rowNum <= endRow; rowNum++) {
            for (let colNum = startCol; colNum <= endCol; colNum++) {
                const cell = worksheet.getCell(rowNum, colNum);

                const value: any = cell && cell.value ? cell.value : undefined;

                if (value === undefined) {
                    errors.push(`invalid range of cell for startRow: ${rowNum}, endRow: ${endRow}, startCol: ${startCol} and endCol ${endCol} this not exist`);
                }

                if (!!regexPattern && !dataType) {
                    const regex: RegExp | null = new RegExp(regexPattern);
                    const validate: boolean = regex.test(value);

                    if (!validate) errors.push(`Invalid data in row ${rowNum}, column ${colNum}: the value ${value} does not comply with the regex ${regexPattern}`);
                }
                if (dataType && !dataTypeValidations[dataType]) {
                    errors.push(`Invalid dataType in rangeValidation: ${dataType}`);
                }

                if (dataType && value !== undefined && !dataTypeValidations[dataType](value, regexPattern)) {
                    errors.push(`Invalid data in row ${rowNum}, column ${colNum}: ${errorMsgs[dataType]} ${!!regexPattern ? `and comply with the regex ${regexPattern}` : ""}`);
                }
            }
        }
    }

}