import { CustomError, SeminarsOrCoursesEntity } from '../../../domain';


export class SeminarsOrCoursesMapper { 

    static seminarsOrCoursesEntityFromObject(object: { [key: string]:any }): SeminarsOrCoursesEntity {

        const { id, _id, topic, institution, date  } = object;

        if(!id && !_id) throw CustomError.badRequest('Missing id');

        if(!topic) throw CustomError.badRequest('Missing topic');
        if(!institution) throw CustomError.badRequest('Missing institution');
        if(!date) throw CustomError.badRequest('Missing date');

        return new SeminarsOrCoursesEntity(
            id || _id,
            topic,
            institution,
            (date as Date).toISOString().split('T')[0]
        );
    }

}