import { HttpError } from 'routing-controllers';
import { ValidationError } from 'class-validator';

type NormalizedValidationError = Record<
    string,
    {
        type: string;
        message: string;
    }[]
>;

export default class EntityValidationError extends HttpError {
    public entityName: string;

    public validationErrors: ValidationError[];

    constructor(entityName: string, validationErrors: ValidationError[] = []) {
        super(400);
        Object.setPrototypeOf(this, EntityValidationError.prototype);
        this.message = 'EntityValidationError';
        this.entityName = entityName;
        this.validationErrors = validationErrors;
    }

    get errors() {
        const errors: NormalizedValidationError = {};
        this.validationErrors.forEach((validationError) => {
            const field = validationError.property;
            errors[field] = [];
            Object.entries(validationError.constraints).forEach(([type, message]) => {
                errors[field].push({ type, message });
            });
        });
        return errors;
    }

    toJSON() {
        return {
            success: false,
            code: this.httpCode,
            message: this.message,
            entityName: this.entityName,
            errors: this.errors,
        };
    }
}
