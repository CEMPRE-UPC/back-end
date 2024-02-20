import { CustomError, CompanyEntity } from '../../../domain';


export class CompanyMapper {

    static CompanyEntityFromObject(object: { [key: string]:any }): CompanyEntity {

        const { id, _id, name, startDate, endDate, } = object;

        if(!id && !_id) {
            throw CustomError.badRequest('Invalid object');
        }

        if(!name) throw CustomError.badRequest('Missing name');
        if(!startDate) throw CustomError.badRequest('Missing startDate');
        if(!endDate) throw CustomError.badRequest('Missing endDate');

        return new CompanyEntity(
            _id || id,
            name,
            (startDate as Date).toISOString().split('T')[0],
            (endDate as Date).toISOString().split('T')[0]
        );
    }
}