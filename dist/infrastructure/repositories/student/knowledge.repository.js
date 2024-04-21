"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeRepository = void 0;
const domain_1 = require("../../../domain");
class KnowledgeRepository {
    constructor(knowledgeDatasource) {
        this.knowledgeDatasource = knowledgeDatasource;
    }
    register(knowledgeDto) {
        return this.knowledgeDatasource.register(knowledgeDto);
    }
    update(optKnowledgeDto) {
        return this.knowledgeDatasource.update(optKnowledgeDto);
    }
    getByStudentId(studentId) {
        if (!studentId)
            throw domain_1.CustomError.badRequest('Missing student id');
        return this.knowledgeDatasource.getByStudentId(studentId);
    }
    delete(id) {
        return this.knowledgeDatasource.delete(id);
    }
}
exports.KnowledgeRepository = KnowledgeRepository;
