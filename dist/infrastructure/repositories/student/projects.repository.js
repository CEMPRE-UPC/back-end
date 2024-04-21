"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsRepository = void 0;
const domain_1 = require("../../../domain");
class ProjectsRepository {
    constructor(projectsDatasource) {
        this.projectsDatasource = projectsDatasource;
    }
    register(projectsDto) {
        return this.projectsDatasource.register(projectsDto);
    }
    update(optProjectsDto) {
        return this.projectsDatasource.update(optProjectsDto);
    }
    getByStudentId(studentId) {
        if (!studentId)
            throw domain_1.CustomError.badRequest('Missing student id');
        return this.projectsDatasource.getByStudentId(studentId);
    }
    getById(id) {
        return this.projectsDatasource.getById(id);
    }
    delete(id) {
        return this.projectsDatasource.delete(id);
    }
}
exports.ProjectsRepository = ProjectsRepository;
