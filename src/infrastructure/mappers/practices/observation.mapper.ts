import { CustomError, ObservationEntity } from '../../../domain';


export class ObservationMapper {

    static observationEntityFromObject(object: {[key: string]: any}): ObservationEntity {
        const { id, _id, content, createdBy, creationDate } = object;
    
        if(!id && !_id) {
            throw CustomError.badRequest('Invalid object');
        }
    
        if(!content) throw CustomError.badRequest('Missing content');
        if(!createdBy) throw CustomError.badRequest('Missing createdBy');
        if(!creationDate) throw CustomError.badRequest('Missing creationDate');
    
        return new ObservationEntity(
            _id || id,
            content,
            createdBy,
            creationDate
        );
    }
}