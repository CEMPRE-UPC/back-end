"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityStudiesDto = void 0;
const student_1 = require("../../../types/student");
class UniversityStudiesDto {
    constructor(institution, program, semester, studentId) {
        this.institution = institution;
        this.program = program;
        this.semester = semester;
        this.studentId = studentId;
    }
    static create(body) {
        const { institution, program, semester, studentId } = body;
        if (!institution)
            return ['institution is required'];
        if (!program)
            return ['program is required'];
        if (!Object.values(student_1.ProgramsEnum).includes(program))
            return ['program is invalid'];
        if (!semester)
            return ['semester is required'];
        if (!studentId)
            return ['studentId is required'];
        return [undefined, new UniversityStudiesDto(institution, program, semester, studentId)];
    }
}
exports.UniversityStudiesDto = UniversityStudiesDto;
