"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsMapper = void 0;
const domain_1 = require("../../../domain");
class ProjectsMapper {
    static projectsEntityFromObject(object) {
        const { id, _id, description, date } = object;
        if (!id && !_id) {
            throw domain_1.CustomError.badRequest('Invalid object');
        }
        if (!description)
            throw domain_1.CustomError.badRequest('Missing description');
        if (!date)
            throw domain_1.CustomError.badRequest('Missing date');
        return new domain_1.ProjectsEntity(_id || id, description, date.toISOString().split('T')[0]);
    }
}
exports.ProjectsMapper = ProjectsMapper;
