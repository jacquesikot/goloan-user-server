const invalidRequest = (error: any) => {
    return {
        message: error[0].message,
        field: error[0].context.label,
        type: error[0].type,
    };
};

export default {
    invalidRequest,
};
