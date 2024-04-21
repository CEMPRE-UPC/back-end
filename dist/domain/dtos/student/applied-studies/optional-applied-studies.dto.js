"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalAppliedStudiesDto = void 0;
const config_1 = require("../../../../config");
const student_1 = require("../../../types/student");
class OptionalAppliedStudiesDto {
    constructor(id, level, institution, collegeDegree, date, studentId) {
        this.id = id;
        this.level = level;
        this.institution = institution;
        this.collegeDegree = collegeDegree;
        this.date = date;
        this.studentId = studentId;
    }
    static create(body, id) {
        const { studentId } = body;
        if (!studentId)
            return ['studentId is required'];
        if (!id)
            return ['id is required'];
        const level = body.level || undefined;
        const institution = body.institution || undefined;
        const collegeDegree = body.collegeDegree || undefined;
        const date = body.date || undefined;
        if (level) {
            if (!Object.values(student_1.LevelStudies).includes(level))
                return ['level is invalid'];
        }
        if (date) {
            if (!config_1.Validators.datePattern.test(date))
                return ['date is invalid'];
        }
        return [undefined, new OptionalAppliedStudiesDto(id, level, institution, collegeDegree, date, studentId)];
    }
}
exports.OptionalAppliedStudiesDto = OptionalAppliedStudiesDto;
