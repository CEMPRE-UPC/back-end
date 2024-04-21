"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeApplicationController = void 0;
const helpers_1 = require("../helpers");
const domain_1 = require("../../domain");
class PracticeApplicationController {
    constructor(practiceApplicationRepository) {
        this.practiceApplicationRepository = practiceApplicationRepository;
        this.register = (req, res) => {
            const { studentId } = req.body;
            new domain_1.PracticeAppRegisterUseCase(this.practiceApplicationRepository).execute(Number(studentId))
                .then(result => res.status(201).json(result))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.update = (req, res) => {
            const { id } = req.params;
            const [error, optionalPracticeApplicationDto] = domain_1.OptionalPracticeApplicationDto.create(req.body, id);
            if (error)
                return res.status(400).json({ message: error });
            new domain_1.PracticeAppUpdateUseCase(this.practiceApplicationRepository).execute(optionalPracticeApplicationDto)
                .then(result => res.json(result))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getByStudentId = (req, res) => {
            const { studentId } = req.params;
            new domain_1.PracticeAppGetByStudentIdUseCase(this.practiceApplicationRepository).execute(Number(studentId))
                .then(result => res.json(result))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getById = (req, res) => {
            const { id } = req.params;
            new domain_1.PracticeAppGetByIdUseCase(this.practiceApplicationRepository).execute(id)
                .then(result => res.json(result))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
    }
}
exports.PracticeApplicationController = PracticeApplicationController;
