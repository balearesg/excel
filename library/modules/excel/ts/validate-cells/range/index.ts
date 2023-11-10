import { IParamsValidateRange } from "../../interfaces";
import { errorMsgs } from "../../utils/error-msgs";
import { dataTypeValidations } from "../../utils/type-validations";
import { validateValues } from "../../utils/validate-values";

export function validateRange({ cells, workbook }: IParamsValidateRange) {
    let errors = []
    const isValidCellRange: boolean = !!cells && !!Array.isArray(cells) && !!cells.length;
    if (!isValidCellRange) return errors
    try {
        for (const range of cells) {

            const validated = validateValues({
                validate: {
                    items: "array",
                    sheet: "string",
                }, toValidate: range,
                entity: "rangeValidation"
            });

            if (validated.length) {
                errors = errors.concat(validated);
                throw new Error("invalid rangeValidation, No valid properties")
            };
            const { items, sheet } = range;
            for (const item of items) {
                const { startRow, endRow, startCol, endCol, type, regex } = item;
                const validated = validateValues({
                    validate: {
                        startRow: "number",
                        endRow: "number",
                        startCol: "number",
                        endCol: "number",
                        type: "string",
                    }, toValidate: item,
                    entity: "item"
                });
                if (validated.length) {
                    errors = errors.concat(validated);
                    throw "invalid rangeValidation, No valid properties"
                };
                const worksheet = workbook.getWorksheet(sheet);


                if (!worksheet) {
                    const error = `not found data with sheet ${sheet}`;
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
        return errors
    } catch (error) {
        console.log("error", error)
        return errors
    }

}