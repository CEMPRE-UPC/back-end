import { CustomError, WorkExperienceEntity } from '../../../domain';


export class WorkExperienceMapper {

    static workExperienceEntityFromObject(object: { [key: string]:any }): WorkExperienceEntity {

        const { id, _id, company, position, functions, start_date, end_date, } = object;

        if(!id && !_id) {
            throw CustomError.badRequest('Invalid object');
        }

        if(!company) throw CustomError.badRequest('Missing company');
        if(!position) throw CustomError.badRequest('Missing position');
        if(!functions) throw CustomError.badRequest('Missing functions');
        if(!start_date) throw CustomError.badRequest('Missing start_date');
        if(!end_date) throw CustomError.badRequest('Missing end_date');

        return new WorkExperienceEntity(
            _id || id,
            company,
            position,
            functions,
            (start_date as Date).toISOString().split('T')[0],
            (end_date as Date).toISOString().split('T')[0]
        );
    }
}