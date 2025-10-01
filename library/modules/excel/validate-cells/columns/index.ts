import { IParamsValidateColumns } from "../../interfaces";
import { errorMsgs } from "../../utils/error-msgs";
import { dataTypeValidations } from "../../utils/type-validations";
import { validateValues } from "../../utils/validate-values";

export function validateColumns({ columns, sheetData, isSheet }: IParamsValidateColumns) {
    let errors = []
    const isValidColumns: boolean = !!columns && !!Array.isArray(columns) && !!columns.length;
    if (!isValidColumns) return errors
    try {
        for (const columnValidation of columns) {

            if (typeof columnValidation !== "object") {
                const error = `invalid columnValidation, this is not object is ${typeof columnValidation}`;
                errors.push(error);
                throw error;
            };

            const validated = validateValues({
                validate: {
                    items: "array",
                    sheet: "string",
                }, toValidate: columnValidation,
                entity: "columnValidation"
            });
            if (validated.length) {
                errors = errors.concat(validated);
                throw "invalid rangeValidation, No valid properties"
            };
            const { items, sheet } = columnValidation;
            for (const item of items) {
                const { key, type, regex } = item;

                const validated = validateValues({
                    validate: {
                        key: "string",
                    }, toValidate: item,
                    entity: "item"
                });

                if (validated.length) {
                    errors = errors.concat(validated);
                    throw "invalid columnValidation, No valid properties"
                };

                const dataToValidate: object[] = !isSheet ? sheetData[sheet] : sheetData;

                if (!dataToValidate) {
                    const error: string = `not found data with sheet ${sheet}`;
                    errors.push(error)
                    throw error;
                };

                if (dataToValidate && type && !regex && !dataTypeValidations[type]) {
                    errors.push(`Invalid type in columnValidation: ${type}`);
                };

                for (let rowNum = 0; rowNum < dataToValidate.length; rowNum++) {
                    const rowData = dataToValidate[rowNum];
                    const value = rowData[key] ?? undefined;
                    if (value === undefined) {
                        errors.push(`invalid columKey ${key} this not exist`);
                    }

                    if (!type && value !== undefined && !!regex) {
                        const regEx: RegExp | null = new RegExp(regex);
                        const validate: boolean = regEx.test(value)
                        if (!validate) errors.push(`Invalid data in column '${key}' at row ${rowNum + 1}: the value ${value} does not comply with the regex ${regex}`);
                    }
                    if (type && value !== undefined && !dataTypeValidations[type](value, regex)) {
                        errors.push(`Invalid data in column '${key}' at row ${rowNum + 1}: ${errorMsgs[type]} ${!!regex ? `and comply with the regex ${regex}` : ""}`);
                    }
                }
            }
        }
        return errors
    } catch (error) {
        return errors
    }

}