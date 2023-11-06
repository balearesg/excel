import { IReturnHandler } from "../../interfaces";

export const validateValues = (params: {
    validate: { [x: string]: string };
    toValidate: any;
    entity: string;
}): IReturnHandler[] => {
    const errors = [];
    Object.entries(params.validate).forEach(([key, value]: any[]) => {
        if (!params.toValidate[key]) {
            errors.push({
                status: false,
                error: `Invalid ${key} in ${params.entity}, this is required`,
            });
            return;
        }
        if (typeof params.toValidate[key] !== value)
            errors.push({
                status: false,
                error: `Invalid ${key} in ${params.entity
                    }, this is not ${value} is ${typeof params.toValidate[key]}`,
            });
    });
    return errors;
};
