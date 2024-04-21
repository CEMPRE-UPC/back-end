"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalProjectsDto = void 0;
class OptionalProjectsDto {
    constructor(id, description, date, studentId) {
        this.id = id;
        this.description = description;
        this.date = date;
        this.studentId = studentId;
    }
    static create(body, id) {
        const { studentId } = body;
        if (!studentId)
            return ['studentId is required'];
        if (!id)
            return ['id is required'];
        const description = body.description || undefined;
        const date = body.date || undefined;
        return [undefined, new OptionalProjectsDto(id, description, date, studentId)];
    }
}
exports.OptionalProjectsDto = OptionalProjectsDto;
