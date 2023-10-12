import { ValidationError } from 'sequelize';

export const mapErrorSequalize = (error: ValidationError): any => {
    return error.errors.map((err) => {
      return { msg: err.message, field: err.path };
    });
  }