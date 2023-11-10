import { IParamsValidateRange } from "../../interfaces";
import { errorMsgs } from "../../utils/error-msgs";
import { dataTypeValidations } from "../../utils/type-validations";
import { validateValues } from "../../utils/validate-values";

export async function validateRange({ cells, workbook, errors }: IParamsValidateRange) {
    const isValidCellRange: boolean = !!cells && !!Array.isArray(cells) && !!cells.length;
    if (!isValidCellRange) return

    for (const range of cells) {
        const { startRow, endRow, startCol, endCol, type, regex, sheetName } = range;
        const validated = validateValues({
            validate: {
                startRow: "number",
                endRow: "number",
                startCol: "number",
                endCol: "number",
                type: "string",
                sheetName: "string",
            }, toValidate: range,
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

                if (!!regex && !type) {
                    const regEx: RegExp | null = new RegExp(regex);
                    const validate: boolean = regEx.test(value);

                    if (!validate) errors.push(`Invalid data in row ${rowNum}, column ${colNum}: the value ${value} does not comply with the regex ${regex}`);
                }
                if (type && !dataTypeValidations[type]) {
                    errors.push(`Invalid type in rangeValidation: ${type}`);
                }

                if (type && value !== undefined && !dataTypeValidations[type](value, regex)) {
                    errors.push(`Invalid data in row ${rowNum}, column ${colNum}: ${errorMsgs[type]} ${!!regex ? `and comply with the regex ${regex}` : ""}`);
                }
            }
        }
    }

}