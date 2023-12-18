export const validate = (type: string, regex: string, value: any): boolean => {
    const regEx: RegExp | null = regex ? new RegExp(regex) : null;
    const validateType = type ? typeof value === type : true;
    const validateRegex = regex ? regEx.test(value) : true
    const validate: boolean = !!regex && !!type ? validateType && validateRegex : !regex && !!type ? validateType : validateRegex
    return validate
};
