import { AreaInterestEntity, CustomError } from '../../../domain';

export class AreaInterestMapper {

    static areaInterestEntityFromObject(body: {[key: string]: any}): AreaInterestEntity {

        const { id, _id, description } = body;

        if (!id && !_id) throw CustomError.badRequest('Id is required');
        if (!description) throw CustomError.badRequest('Description is required');

        return new AreaInterestEntity(
            id || _id,
            description
        );
    }
}