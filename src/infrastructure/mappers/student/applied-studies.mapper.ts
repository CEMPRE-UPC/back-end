

import { AppliedStudiesEntity, CustomError,  } from '../../../domain';

export class AppliedStudiesMapper {

    static appliedStudiesEntityFromObject(object: { [key: string]:any }): AppliedStudiesEntity {

        const { id, _id, level, institution, college_degree, date } = object;

        if(!id && !_id) {
            throw CustomError.badRequest('Invalid object');
        }

        if(!level) throw CustomError.badRequest('Missing level');
        if(!institution) throw CustomError.badRequest('Missing institution');
        if(!college_degree) throw CustomError.badRequest('Missing college degree');
        if(!date) throw CustomError.badRequest('Missing date');

        return new AppliedStudiesEntity(
            _id || id,
            level,
            institution,
            college_degree,
            (date as Date).toISOString().split('T')[0]
        );
    }
}