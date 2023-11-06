export const validate = (type: string, regexPattern: string, value: any): boolean => {
    const regex: RegExp | null = regexPattern ? new RegExp(regexPattern) : null;
    const validateType = type ? typeof value === type : true;
    const validateRegex = regex ? regex.test(value) : true
    const validate: boolean = !!regexPattern && !!type ? validateType && validateRegex : !regexPattern && !!type ? validateType : validateRegex
    return validate
};
