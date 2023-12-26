import { CustomError, WorkExperienceEntity } from '../../../domain';


export class WorkExperienceMapper {

    static workExperienceEntityFromObject(object: { [key: string]:any }): WorkExperienceEntity {

        const { id, _id, company, position, functions, startDate, endDate, } = object;

        if(!id && !_id) {
            throw CustomError.badRequest('Invalid object');
        }

        if(!company) throw CustomError.badRequest('Missing company');
        if(!position) throw CustomError.badRequest('Missing position');
        if(!functions) throw CustomError.badRequest('Missing functions');
        if(!startDate) throw CustomError.badRequest('Missing startDate');
        if(!endDate) throw CustomError.badRequest('Missing endDate');

        return new WorkExperienceEntity(
            _id || id,
            company,
            position,
            functions,
            (startDate as Date).toISOString().split('T')[0],
            (endDate as Date).toISOString().split('T')[0]
        );
    }
}