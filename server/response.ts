export const createResponse = (
    success: boolean,
    message: string,
    results?: object | null
) => {
    return {
        success,
        message,
        results: results || null,
    };
};
export const success = (
    message: string,
    statusCode: number,
    results?: object
) => {
    return {
        message,
        error: false,
        code: statusCode,
        results,
    };
};

export const error = (message: string, statusCode: number) => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];

    // Get matched code
    const findCode = codes.find((code) => code == statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode;

    return {
        message,
        code: statusCode,
        error: true,
    };
};
