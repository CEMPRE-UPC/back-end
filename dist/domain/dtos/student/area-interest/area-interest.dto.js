"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaInterestDto = void 0;
class AreaInterestDto {
    constructor(description, studentId) {
        this.description = description;
        this.studentId = studentId;
    }
    static create(body) {
        const { description = [], studentId } = body;
        if (!studentId)
            return ['studentId is required'];
        if (!description.length)
            return ['description is required'];
        return [undefined, new AreaInterestDto(description, studentId)];
    }
}
exports.AreaInterestDto = AreaInterestDto;
