import { CustomError, ProjectsEntity } from '../../../domain';

export class ProjectsMapper {

    static projectsEntityFromObject(object: {[key: string]: any}): ProjectsEntity {

        const { id, _id, description, date } = object;

        if(!id && !_id) {
            throw CustomError.badRequest('Invalid object');
        }

        if(!description) throw CustomError.badRequest('Missing description');
        if(!date) throw CustomError.badRequest('Missing date');

        return new ProjectsEntity(
            _id || id,
            description,
            (date as Date).toISOString().split('T')[0]
        );
    }
}