import { validate } from "./validate";

// Objeto de validaciones de tipos
export const dataTypeValidations: { [key: string]: (value: any, regexPattern: string,) => boolean } = {
    string: (value: any, regexPattern) => validate("string", regexPattern, value),
    number: (value: any, regexPattern) => validate("number", regexPattern, value),
    boolean: (value: any, regexPattern) => validate("boolean", regexPattern, value),
    date: (value: any, regexPattern) => validate("date", regexPattern, value),
};