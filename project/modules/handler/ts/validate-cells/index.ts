import { IReturnHandler, IValidateCells } from "../interfaces";

export function validateCells(params: IValidateCells): IReturnHandler[] {
    const { cellsValidations, sheetData, workbook } = params;

    if (!cellsValidations) return [];

    let errors: IReturnHandler[] = [];

    try {
        if (!!cellsValidations && typeof cellsValidations !== "object") {
            const error: string = `invalid cellsValidations this is not a objet is a ${typeof cellsValidations}`;
            errors.push({ status: false, error });
            throw error
        };

        const { columnValidations, cellRangeValidations } = cellsValidations;

        const validate = (type, regexPattern, value) => {
            const regex: RegExp | null = regexPattern ? new RegExp(regexPattern) : null;
            const validateType = type ? typeof value === type : true;
            const validateRegex = regex ? regex.test(value) : true
            const validate: boolean = !!regexPattern && !!type ? validateType && validateRegex : !regexPattern && !!type ? validateType : validateRegex
            return validate
        }

        // Objeto de validaciones de tipos
        const dataTypeValidations: { [key: string]: (value: any, regexPattern: RegExp,) => boolean } = {
            string: (value: any, regexPattern) => validate("string", regexPattern, value),
            number: (value: any, regexPattern) => validate("number", regexPattern, value),
            boolean: (value: any, regexPattern) => validate("boolean", regexPattern, value),
            date: (value: any, regexPattern) => validate("date", regexPattern, value),
        };

        // Objeto con mensajes de error correspondientes a cada tipo
        const errorMsgs: { [key: string]: string } = {
            string: 'should be a string',
            number: 'should be a number',
            boolean: 'should be a boolean',
            date: 'should be a Date object',
        };

        const validateValues = (params) => {
            const errors = [];
            Object.entries(params.validate).forEach(([key, value]: any[]) => {
                if (!params.toValidate[key]) {
                    errors.push({ status: false, error: `Invalid ${key} in ${params.entity}, this is required` })
                    return
                }
                if (typeof params.toValidate[key] !== value) errors.push({ status: false, error: `Invalid ${key} in ${params.entity}, this is not ${value} is ${typeof params.toValidate[key]}` })
            });
            return errors
        };

        const isValidColumnValidations: boolean = !!columnValidations && !!Array.isArray(columnValidations) && !!columnValidations.length;

        const isValidCellRangeValidations: boolean = !!cellRangeValidations && !!Array.isArray(cellRangeValidations) && !!cellRangeValidations.length;

        if (isValidColumnValidations) {
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

        if (isValidCellRangeValidations) {
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
                    errors.push({ status: false, error });
                    throw error;
                };

                for (let rowNum = startRow; rowNum <= endRow; rowNum++) {
                    for (let colNum = startCol; colNum <= endCol; colNum++) {
                        const cell = worksheet.getCell(rowNum, colNum);

                        const value: any = cell && cell.value ? cell.value : undefined;

                        if (value === undefined) {
                            errors.push({ status: false, error: `invalid range of cell for startRow: ${rowNum}, endRow: ${endRow}, startCol: ${startCol} and endCol ${endCol} this not exist` });
                        }

                        if (!!regexPattern && !dataType) {
                            const regex: RegExp | null = new RegExp(regexPattern);
                            const validate: boolean = regex.test(value);

                            if (!validate) errors.push({ status: false, error: `Invalid data in row ${rowNum}, column ${colNum}: the value ${value} does not comply with the regex ${regexPattern}` });
                        }
                        if (dataType && !dataTypeValidations[dataType]) {
                            errors.push({ status: false, error: `Invalid dataType in rangeValidation: ${dataType}` });
                        }

                        if (dataType && value !== undefined && !dataTypeValidations[dataType](value, regexPattern)) {
                            errors.push({ status: false, error: `Invalid data in row ${rowNum}, column ${colNum}: ${errorMsgs[dataType]} ${!!regexPattern ? `and comply with the regex ${regexPattern}` : ""}` });
                        }
                    }
                }
            }
        }

        return errors;
    } catch (error) {
        return errors;
    };

}
