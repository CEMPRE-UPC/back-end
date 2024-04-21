"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedStudiesDto = void 0;
const config_1 = require("../../../../config");
const student_1 = require("../../../types/student");
class AppliedStudiesDto {
    constructor(level, institution, collegeDegree, date, studentId) {
        this.level = level;
        this.institution = institution;
        this.collegeDegree = collegeDegree;
        this.date = date;
        this.studentId = studentId;
    }
    static create(body) {
        const { level, institution, collegeDegree, date, studentId } = body;
        if (!level)
            return ['level is required'];
        if (!Object.values(student_1.LevelStudies).includes(level))
            return ['level is invalid'];
        if (!institution)
            return ['institution is required'];
        if (!collegeDegree)
            return ['collegeDegree is required'];
        if (!date)
            return ['date is required'];
        if (!config_1.Validators.datePattern.test(date))
            return ['date is invalid'];
        if (!studentId)
            return ['studentId is required'];
        return [undefined, new AppliedStudiesDto(level, institution, collegeDegree, date, studentId)];
    }
}
exports.AppliedStudiesDto = AppliedStudiesDto;
