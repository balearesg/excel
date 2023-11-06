import { errorMsgs } from "../utils/error-msgs";
import { dataTypeValidations } from "../utils/type-validations";
import { validateValues } from "../utils/validate-values";

export async function validateColumns({ columnValidations, errors, sheetData }) {
    const isValidColumnValidations: boolean = !!columnValidations && !!Array.isArray(columnValidations) && !!columnValidations.length;
    if (!isValidColumnValidations) return

    for (const columnValidation of columnValidations) {

        if (typeof columnValidation !== "object") {
            const error = `invalid columnValidation, this is not object is ${typeof columnValidation}`;
            errors.push({ status: false, error });
            throw error;
        };

        const { columnKey, dataType, regexPattern, sheetName } = columnValidation;

        const validated = validateValues({
            validate: {
                sheetName: "string",
                columnKey: "string",
            }, toValidate: columnValidation,
            entity: "columnValidation"
        });

        if (validated.length) {
            errors = errors.concat(validated);
            throw "invalid columnValidation, No valid properties"
        };

        const dataToValidate: object[] = sheetData[sheetName];

        if (!dataToValidate) {
            const error: string = `not found data with sheetName ${sheetName}`;
            errors.push({ status: false, error })
            throw error;
        };

        if (dataToValidate && dataType && !regexPattern && !dataTypeValidations[dataType]) {
            errors.push({ status: false, error: `Invalid dataType in columnValidation: ${dataType}` });
        };

        for (let rowNum = 0; rowNum < dataToValidate.length; rowNum++) {
            const rowData = dataToValidate[rowNum];
            const value = rowData[columnKey] ?? undefined;
            if (value === undefined) {
                errors.push({ status: false, error: `invalid columKey ${columnKey} this not exist` });
            }

            if (!dataType && value !== undefined && !!regexPattern) {
                const regex: RegExp | null = new RegExp(regexPattern);
                const validate: boolean = regex.test(value)
                if (!validate) errors.push({ status: false, error: `Invalid data in column '${columnKey}' at row ${rowNum + 1}: the value ${value} does not comply with the regex ${regexPattern}` });
            }
            if (dataType && value !== undefined && !dataTypeValidations[dataType](value, regexPattern)) {
                errors.push({ status: false, error: `Invalid data in column '${columnKey}' at row ${rowNum + 1}: ${errorMsgs[dataType]} ${!!regexPattern ? `and comply with the regex ${regexPattern}` : ""}` });
            }
        }
    }

}