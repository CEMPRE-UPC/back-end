"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalUniversityStudiesDto = void 0;
const student_1 = require("../../../types/student");
class OptionalUniversityStudiesDto {
    constructor(id, institution, program, semester, studentId) {
        this.id = id;
        this.institution = institution;
        this.program = program;
        this.semester = semester;
        this.studentId = studentId;
    }
    static create(body, id) {
        const { studentId } = body;
        if (!id)
            return ['id is required'];
        if (!studentId)
            return ['studentId is required'];
        const institution = body.institution || undefined;
        const program = body.program || undefined;
        const semester = body.semester || undefined;
        if (program) {
            if (!Object.values(student_1.ProgramsEnum).includes(program))
                return ['program is invalid'];
        }
        return [undefined, new OptionalUniversityStudiesDto(id, institution, program, semester, studentId)];
    }
}
exports.OptionalUniversityStudiesDto = OptionalUniversityStudiesDto;
