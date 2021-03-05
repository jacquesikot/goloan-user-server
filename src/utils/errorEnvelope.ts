const invalidRequest = (error: any) => {
    return {
        message: error[0].message,
        field: error[0].context.label,
        type: error[0].type,
    };
};

const generic = (message: string, code: number) => {
    return {
        message,
        code,
    };
};

export default {
    invalidRequest,
    generic,
};
