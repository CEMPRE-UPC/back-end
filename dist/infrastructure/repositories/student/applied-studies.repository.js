"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedStudiesRepository = void 0;
class AppliedStudiesRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    register(appliedStudiesDto) {
        return this.dataSource.register(appliedStudiesDto);
    }
    update(optAppliedStudiesDto) {
        return this.dataSource.update(optAppliedStudiesDto);
    }
    getByIdStudent(studentId) {
        return this.dataSource.getByIdStudent(studentId);
    }
    getById(id) {
        return this.dataSource.getById(id);
    }
    delete(id) {
        return this.dataSource.delete(id);
    }
}
exports.AppliedStudiesRepository = AppliedStudiesRepository;
