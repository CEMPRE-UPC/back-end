"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeApplicationRepository = void 0;
class PracticeApplicationRepository {
    constructor(practiceApplication) {
        this.practiceApplication = practiceApplication;
    }
    register(studentId) {
        return this.practiceApplication.register(studentId);
    }
    update(optPracticeApplicationDto) {
        return this.practiceApplication.update(optPracticeApplicationDto);
    }
    getByIdStudent(studentId) {
        return this.practiceApplication.getByIdStudent(studentId);
    }
    getById(id) {
        throw new Error('Method not implemented.');
    }
}
exports.PracticeApplicationRepository = PracticeApplicationRepository;
