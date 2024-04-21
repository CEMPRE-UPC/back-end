"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeController = void 0;
const practice_1 = require("../../../domain/use-cases/student/practice");
const helpers_1 = require("../../helpers");
class PracticeController {
    constructor(practiceRepository) {
        this.practiceRepository = practiceRepository;
        this.getPracticeById = (req, res) => {
            const { id } = req.params;
            new practice_1.GetPracticeByIdUseCase(this.practiceRepository).execute(id)
                .then(practice => res.json(practice))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getAllPractices = (req, res) => {
            new practice_1.GetAllPracticesUseCase(this.practiceRepository).execute()
                .then(practice => res.json(practice))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            new practice_1.DeleteUseCase(this.practiceRepository).execute(id)
                .then(practice => res.json(practice))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
    }
}
exports.PracticeController = PracticeController;
