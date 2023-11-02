import { CustomError, PracticeEntity } from '../../../domain';


export class PracticeMapper {

    
    static practiceEntityFromObject(object: { [key: string]:any }): PracticeEntity {

        const { id, _id, modality, createdAt, updatedAt  } = object;

        if(!id && !_id) throw CustomError.badRequest('Missing id');
        if(!modality) throw CustomError.badRequest('Missing modality');
        if(!createdAt) throw CustomError.badRequest('Missing createdAt');
        if(!updatedAt) throw CustomError.badRequest('Missing updatedAt');

        return new PracticeEntity(
            id || _id,
            modality,
            (createdAt as Date).toISOString().split('T')[0],
            (updatedAt as Date).toISOString().split('T')[0],
        );
    }
}