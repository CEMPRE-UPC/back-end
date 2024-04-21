"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalAreaInterestDto = void 0;
class OptionalAreaInterestDto {
    constructor(id, description, studentId) {
        this.id = id;
        this.description = description;
        this.studentId = studentId;
    }
    static create(body, id) {
        const { studentId } = body;
        if (!studentId)
            return ['studentId is required'];
        if (!id)
            return ['id is required'];
        const description = body.description || undefined;
        return [undefined, new OptionalAreaInterestDto(id, description, studentId)];
    }
}
exports.OptionalAreaInterestDto = OptionalAreaInterestDto;
