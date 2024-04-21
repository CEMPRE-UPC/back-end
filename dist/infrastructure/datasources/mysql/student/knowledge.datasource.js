"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeDataSource = void 0;
const mysqldb_1 = require("../../../../data/mysqldb");
const domain_1 = require("../../../../domain");
const mappers_1 = require("../../../mappers");
class KnowledgeDataSource {
    register(knowledgeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, studentId } = knowledgeDto;
            try {
                const knowledge = mysqldb_1.KnowledgeModel.build({
                    description,
                    studentId
                });
                const savedKnowledge = yield knowledge.save();
                return mappers_1.KnowledgeMapper.knowledgeEntityFromObject(savedKnowledge.toJSON());
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    update(optKnowledgeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, description, studentId } = optKnowledgeDto;
            try {
                const exist = yield mysqldb_1.KnowledgeModel.findOne({ where: { id, studentId } });
                if (!exist) {
                    throw domain_1.CustomError.notFound('Project not found');
                }
                const knowledge = yield mysqldb_1.KnowledgeModel.update({
                    description,
                }, { where: { id, studentId } });
                return knowledge.at(0) === 1;
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    getByStudentId(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const knowledge = yield mysqldb_1.KnowledgeModel.findOne({ where: { studentId } });
                if (!knowledge) {
                    return null;
                }
                return mappers_1.KnowledgeMapper.knowledgeEntityFromObject(knowledge.toJSON());
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const knowledge = yield mysqldb_1.KnowledgeModel.destroy({ where: { id } });
                return knowledge === 1;
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
}
exports.KnowledgeDataSource = KnowledgeDataSource;
