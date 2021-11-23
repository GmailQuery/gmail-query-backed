import { HttpError } from 'routing-controllers';

export interface WrappableError {
    toJSON?: () => Record<string, unknown>;
    message: string;
    httpCode?: number;
    name?: string;
}

export default class AppErrorWrapper extends HttpError {
    type?: string;

    previousError: Error;

    constructor(error: WrappableError, httpCode?: number, message?: string) {
        super(httpCode || error.httpCode || 400);
        Object.setPrototypeOf(this, AppErrorWrapper.prototype);
        this.message = message || error.message || 'Unknown Error occurred';
        this.previousError = error as Error;
    }

    toJSON() {
        return {
            success: false,
            code: this.httpCode,
            message: this.message,
        };
    }
}
