export class ApiError extends Error {
    statusCode: number;
    error: string;

    constructor(statusCode: number, message: string, error: string) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.name = "ApiError";
    }
}
