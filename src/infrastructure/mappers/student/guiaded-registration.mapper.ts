import { GuiadedRegistrationEntity, CustomError } from '../../../domain';

export class GuiadedRegistrationMapper {

    static guiadedRegistrationEntityFromObject(body: {[key: string]: any}): GuiadedRegistrationEntity {

        const { id, _id, studentId } = body;

        if (!id && !_id) throw CustomError.badRequest('Id is required');
        if (!studentId) throw CustomError.badRequest('Student id is required');

        return new GuiadedRegistrationEntity(
            id || _id,
            studentId
        );
    }
}