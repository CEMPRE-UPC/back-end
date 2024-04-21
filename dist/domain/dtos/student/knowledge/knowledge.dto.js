"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeDto = void 0;
class KnowledgeDto {
    constructor(description, studentId) {
        this.description = description;
        this.studentId = studentId;
    }
    static create(body) {
        const { description = [], studentId } = body;
        if (!description.length)
            return ['description is required'];
        if (!studentId)
            return ['studentId is required'];
        return [undefined, new KnowledgeDto(description, studentId)];
    }
}
exports.KnowledgeDto = KnowledgeDto;
