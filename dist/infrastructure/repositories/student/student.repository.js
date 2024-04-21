"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRepository = void 0;
class StudentRepository {
    constructor(studentDataSource) {
        this.studentDataSource = studentDataSource;
    }
    register(stundetDto) {
        return this.studentDataSource.register(stundetDto);
    }
    update(optionalStudentDto) {
        return this.studentDataSource.update(optionalStudentDto);
    }
    getStudentByCedula(cedula) {
        return this.studentDataSource.getStudentByCedula(cedula);
    }
    getStudentByIdUser(id) {
        return this.studentDataSource.getStudentByIdUser(id);
    }
    getAllStudents(modality, program) {
        return this.studentDataSource.getAllStudents(modality, program);
    }
    delete(id) {
        return this.studentDataSource.delete(id);
    }
}
exports.StudentRepository = StudentRepository;
