"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalSeminarsOrCoursesDto = void 0;
const config_1 = require("../../../../config");
class OptionalSeminarsOrCoursesDto {
    constructor(id, topic, institution, date, studentId) {
        this.id = id;
        this.topic = topic;
        this.institution = institution;
        this.date = date;
        this.studentId = studentId;
    }
    static create(body, id) {
        const { studentId } = body;
        if (!studentId)
            return ['studentId is required'];
        if (!id)
            return ['id is required'];
        const topic = body.topic || undefined;
        const institution = body.institution || undefined;
        const date = body.date || undefined;
        if (date) {
            if (!config_1.Validators.datePattern.test(date))
                return ['date is invalid'];
        }
        return [undefined, new OptionalSeminarsOrCoursesDto(id, topic, institution, date, studentId)];
    }
}
exports.OptionalSeminarsOrCoursesDto = OptionalSeminarsOrCoursesDto;
