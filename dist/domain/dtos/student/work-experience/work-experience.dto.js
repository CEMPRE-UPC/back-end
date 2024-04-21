"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkExperienceDto = void 0;
const config_1 = require("../../../../config");
class WorkExperienceDto {
    constructor(studentId, company, position, functions, startDate, endDate) {
        this.studentId = studentId;
        this.company = company;
        this.position = position;
        this.functions = functions;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    static create(body) {
        const { company, position, functions, startDate, endDate, studentId } = body;
        if (!studentId)
            return ['studentId is required'];
        if (!company)
            return ['company is required'];
        if (!position)
            return ['position is required'];
        if (!functions)
            return ['functions is required'];
        if (!startDate)
            return ['startDate is required'];
        if (!config_1.Validators.datePattern.test(startDate))
            return ['startDate is invalid'];
        if (!endDate)
            return ['endDate is required'];
        if (!config_1.Validators.datePattern.test(endDate))
            return ['endDate is invalid'];
        return [undefined, new WorkExperienceDto(studentId, company, position, functions, startDate, endDate)];
    }
}
exports.WorkExperienceDto = WorkExperienceDto;
