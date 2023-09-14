import { ValidationError } from 'class-validator';

export const mapErrorResult = (errors: ValidationError[]) => {
    return errors.map(error => {
        const { property, constraints } = error;
        if(constraints) {
            const { [Object.keys(constraints)[0]]: message } = constraints;
            return { field: property, message };
        }
    })
}