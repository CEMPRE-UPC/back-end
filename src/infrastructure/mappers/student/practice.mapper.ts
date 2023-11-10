import { CustomError, PracticeEntity } from '../../../domain';


export class PracticeMapper {

    
    static practiceEntityFromObject(object: { [key: string]:any }): PracticeEntity {

        const { id, _id, modality  } = object;

        if(!id && !_id) throw CustomError.badRequest('Missing id');
        if(!modality) throw CustomError.badRequest('Missing modality');

        return new PracticeEntity(
            id || _id,
            modality,
        );
    }
}