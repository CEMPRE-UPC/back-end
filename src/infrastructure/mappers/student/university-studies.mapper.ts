import { CustomError, UniversityStudiesEntity,  } from '../../../domain';

export class UniversityStudiesMapper {

    static universityStudiesEntityFromObject(object: { [key: string]:any }): UniversityStudiesEntity {

        const { id, _id, institution, program, semester } = object;

        if(!id && !_id) {
            throw CustomError.badRequest('Invalid object');
        }

        if(!institution) throw CustomError.badRequest('Missing institution');
        if(!program) throw CustomError.badRequest('Missing program');
        if(!semester) throw CustomError.badRequest('Missing semester');

        return new UniversityStudiesEntity(
            _id || id,
            institution,
            program,
            semester,
        );
    }
}