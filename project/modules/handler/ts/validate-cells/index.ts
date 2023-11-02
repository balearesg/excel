import { IReturnHandler, IValidateCells } from "../interfaces";

export function validateCells({ cellsValidations, sheetData, workbook }: IValidateCells): IReturnHandler[] {

    if (!cellsValidations) return [];

    let errors: IReturnHandler[] = [];

    try {
        if (!!cellsValidations && typeof cellsValidations !== "object") {
            const error: string = `invalid cellsValidations this is not a objet is a ${typeof cellsValidations}`;
            errors.push({ status: false, error });
            throw error
        };

        const { columnValidations, cellRangeValidations } = cellsValidations;

        // Objeto de validaciones de tipos
        const dataTypeValidations: { [key: string]: (value: any, regexPattern?: RegExp) => boolean } = {
            string: (value: any, regexPattern?: RegExp) => {
                const regex: RegExp | null = regexPattern ? new RegExp(regexPattern) : null;
                const validate: boolean = regexPattern ? regex.test(value) : typeof value === 'string'
                return validate
            },
            number: (value: any) => typeof value === 'number',
            boolean: (value: any) => typeof value === 'boolean',
            date: (value: any) => value instanceof Date,
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
                        dataType: "string"
                    }, toValidate: columnValidation,
                    entity: "columnValidation"
                });

                if (validated.length) {
                    errors = errors.concat(validated);
                    throw "invalid columnValidation, No valid properties"
                };

                const dataToValidate: object[] = sheetData.find((sheet) => sheet.sheetName === sheetName)?.data;

                if (!dataToValidate) {
                    const error: string = `not found data with sheetName ${sheetName}`;
                    errors.push({ status: false, error })
                    throw error;
                };

                if (dataToValidate && dataType && !dataTypeValidations[dataType]) {
                    errors.push({ status: false, error: `Invalid dataType in columnValidation: ${dataType}` });
                };

                for (let rowNum = 0; rowNum < dataToValidate.length; rowNum++) {
                    const rowData = dataToValidate[rowNum];
                    const value = rowData[columnKey] ?? undefined;
                    if (dataType && value !== undefined && !dataTypeValidations[dataType](value, regexPattern)) {
                        errors.push({ status: false, error: `Invalid data in column '${columnKey}' at row ${rowNum + 1}: ${errorMsgs[dataType]}` });
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
                const worksheet = workbook.getWorksheet(sheetName) || workbook.addWorksheet(sheetName);

                if (!worksheet) {
                    const error = `not found data with sheetName ${sheetName}`;
                    errors.push({ status: false, error });
                    throw error;
                };

                for (let rowNum = startRow; rowNum <= endRow; rowNum++) {
                    for (let colNum = startCol; colNum <= endCol; colNum++) {
                        if (dataType && !dataTypeValidations[dataType]) {
                            errors.push({ status: false, error: `Invalid dataType in rangeValidation: ${dataType}` });
                            return
                        }
                        const cell = worksheet.getCell(rowNum, colNum);

                        const value = cell ? cell.value : undefined;
                        if (dataType && value !== undefined && !dataTypeValidations[dataType](value, regexPattern)) {
                            errors.push({ status: false, error: `Invalid data in row ${rowNum}, column ${colNum}: ${errorMsgs[dataType]}` });
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
