import { CallEntity, CustomError } from '../../../domain';


export class CallMapper {
    
    static callEntityFromObject(object: { [key: string]: any }) {

        console.log(object);
        
        
            const {
                _id,
                id,
                name,
                startDate,
                endDate,
                status,
                practiceId,
            } = object;
    
            if (!_id && !id) throw CustomError.badRequest('Missing id');
            if (!name) throw CustomError.badRequest('Missing name');
            if (!startDate) throw CustomError.badRequest('Missing startDate');
            if (!endDate) throw CustomError.badRequest('Missing endDate');
            if (!status) throw CustomError.badRequest('Missing status');
            if (!practiceId) throw CustomError.badRequest('Missing practiceId');
    
            return new CallEntity(
                _id || id,
                name,
                (startDate as Date).toISOString().split('T')[0],
                (endDate as Date).toISOString().split('T')[0],
                status,
                practiceId
            );
    }
}
