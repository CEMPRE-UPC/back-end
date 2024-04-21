"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeminarsOrCoursesDto = void 0;
const config_1 = require("../../../../config");
class SeminarsOrCoursesDto {
    constructor(topic, institution, date, studentId) {
        this.topic = topic;
        this.institution = institution;
        this.date = date;
        this.studentId = studentId;
    }
    static create(body) {
        const { topic, institution, date, studentId } = body;
        if (!topic)
            return ['topic is required'];
        if (!institution)
            return ['institution is required'];
        if (!date)
            return ['date is required'];
        if (!config_1.Validators.datePattern.test(date))
            return ['date is invalid'];
        if (!studentId)
            return ['studentId is required'];
        return [undefined, new SeminarsOrCoursesDto(topic, institution, date, studentId)];
    }
}
exports.SeminarsOrCoursesDto = SeminarsOrCoursesDto;
