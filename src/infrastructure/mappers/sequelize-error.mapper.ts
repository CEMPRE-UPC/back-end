import { ValidationError } from 'sequelize';


export class SequelizeErrorMapper {

    static customErrorFromObject = (error: ValidationError): any => {
        return error.errors.map((err) => {
            return { msg: err.message, field: err.path };
        });
    }
}