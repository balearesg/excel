import { validate } from "./validate";

// Objeto de validaciones de tipos
export const dataTypeValidations: { [key: string]: (value: any, regex: string,) => boolean } = {
    string: (value: any, regex) => validate("string", regex, value),
    number: (value: any, regex) => validate("number", regex, value),
    boolean: (value: any, regex) => validate("boolean", regex, value),
    date: (value: any, regex) => validate("date", regex, value),
};