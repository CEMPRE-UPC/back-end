import { CustomError, KnowledgeEntity } from '../../../domain';

export class KnowledgeMapper {

    static knowledgeEntityFromObject(object: {[key: string]: any}): KnowledgeEntity {

        const { id, _id, description } = object;

        if(!id && !_id) {
            throw CustomError.badRequest('Invalid object');
        }

        if(!description) throw CustomError.badRequest('Missing description');

        return new KnowledgeEntity(
            _id || id,
            description
        );
    }
}