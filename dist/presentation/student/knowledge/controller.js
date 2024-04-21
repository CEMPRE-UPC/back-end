"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeController = void 0;
const student_1 = require("../../../domain/dtos/student");
const knowledge_1 = require("../../../domain/use-cases/student/knowledge");
const helpers_1 = require("../../helpers");
class KnowledgeController {
    constructor(knowledgeReposotory) {
        this.knowledgeReposotory = knowledgeReposotory;
        this.register = (req, res) => {
            const [error, knowledgeDto] = student_1.KnowledgeDto.create(req.body);
            console.log(knowledgeDto);
            if (error)
                return res.status(400).json({ message: error });
            new knowledge_1.RegisterUseCase(this.knowledgeReposotory).execute(knowledgeDto)
                .then(project => res.status(201).json(project))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.update = (req, res) => {
            const { id } = req.params;
            const [error, optKnowledgeDto] = student_1.OptionalKnowledgeDto.create(req.body, id);
            if (error)
                return res.status(400).json({ message: error });
            new knowledge_1.UpdateUseCase(this.knowledgeReposotory).execute(optKnowledgeDto)
                .then(updated => res.status(200).json(updated))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getByStudentId = (req, res) => {
            const { studentId } = req.params;
            new knowledge_1.GetKnowledgeUseCase(this.knowledgeReposotory).execute(studentId)
                .then(projects => res.status(200).json(projects))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            new knowledge_1.DeleteUseCase(this.knowledgeReposotory).execute(id)
                .then(deleted => res.status(200).json(deleted))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
    }
}
exports.KnowledgeController = KnowledgeController;
