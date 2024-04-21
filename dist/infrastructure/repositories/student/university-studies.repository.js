"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityStudiesRepository = void 0;
class UniversityStudiesRepository {
    constructor(universityStudiesDataSource) {
        this.universityStudiesDataSource = universityStudiesDataSource;
    }
    register(universityStudiesDto) {
        return this.universityStudiesDataSource.register(universityStudiesDto);
    }
    update(optUniversityStudiesDto) {
        return this.universityStudiesDataSource.update(optUniversityStudiesDto);
    }
    getByIdStudent(studentId) {
        return this.universityStudiesDataSource.getByIdStudent(studentId);
    }
    delete(id) {
        return this.universityStudiesDataSource.delete(id);
    }
}
exports.UniversityStudiesRepository = UniversityStudiesRepository;
