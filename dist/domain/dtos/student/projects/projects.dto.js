"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsDto = void 0;
const config_1 = require("../../../../config");
class ProjectsDto {
    constructor(description, date, studentId) {
        this.description = description;
        this.date = date;
        this.studentId = studentId;
    }
    static create(body) {
        const { description, date, studentId } = body;
        if (!description)
            return ['description is required'];
        if (!date)
            return ['date is required'];
        if (!config_1.Validators.datePattern.test(date))
            return ['date is invalid'];
        if (!studentId)
            return ['studentId is required'];
        return [undefined, new ProjectsDto(description, date, studentId)];
    }
}
exports.ProjectsDto = ProjectsDto;
