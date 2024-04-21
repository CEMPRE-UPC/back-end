"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeminarsOrCoursesRepository = void 0;
class SeminarsOrCoursesRepository {
    constructor(seminarsOrCoursesDataSource) {
        this.seminarsOrCoursesDataSource = seminarsOrCoursesDataSource;
    }
    register(seminarsOrCoursesDto) {
        return this.seminarsOrCoursesDataSource.register(seminarsOrCoursesDto);
    }
    update(optSeminarsOrCoursesDto) {
        return this.seminarsOrCoursesDataSource.update(optSeminarsOrCoursesDto);
    }
    getByIdStudent(studentId) {
        return this.seminarsOrCoursesDataSource.getByIdStudent(studentId);
    }
    getById(id) {
        return this.seminarsOrCoursesDataSource.getById(id);
    }
    delete(id) {
        return this.seminarsOrCoursesDataSource.delete(id);
    }
}
exports.SeminarsOrCoursesRepository = SeminarsOrCoursesRepository;
