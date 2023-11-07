import { IValidateValues } from "../interfaces";

export const validateValues = (params: IValidateValues): string[] => {
    const errors: string[] = [];
    if (!params.validate) {
        errors.push(`invalid ${params.entity}`);
        return
    };
    if (typeof params.validate !== "object") {
        errors.push(`invalid ${params.entity} this is not a objet`);
        return
    };
    Object.entries(params.validate).forEach(([key, value]: any[]) => {
        if (!params.toValidate[key]) {
            errors.push(`Invalid ${key} in ${params.entity}, this is required`);
            return;
        };
        if (value === "array") {
            if (!Array.isArray(params.toValidate[key]) || !params.toValidate[key].length) {
                errors.push(
                    `Invalid ${key} in ${params.entity
                    }, this is not ${value} is ${typeof params.toValidate[key]}`
                );
            };
            return
        }
        if (typeof params.toValidate[key] !== value)
            errors.push(
                `Invalid ${key} in ${params.entity
                }, this is not ${value} is ${typeof params.toValidate[key]}`
            );
    });
    return errors;
};
