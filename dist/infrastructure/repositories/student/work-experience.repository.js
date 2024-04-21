"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkExperienceRepository = void 0;
class WorkExperienceRepository {
    constructor(workExperienceDataSource) {
        this.workExperienceDataSource = workExperienceDataSource;
    }
    register(workExperienceDto) {
        return this.workExperienceDataSource.register(workExperienceDto);
    }
    update(optWorkExperienceDto) {
        return this.workExperienceDataSource.update(optWorkExperienceDto);
    }
    getByIdStudent(studentId) {
        return this.workExperienceDataSource.getByIdStudent(studentId);
    }
    getById(id) {
        return this.workExperienceDataSource.getById(id);
    }
    delete(id) {
        return this.workExperienceDataSource.delete(id);
    }
}
exports.WorkExperienceRepository = WorkExperienceRepository;
