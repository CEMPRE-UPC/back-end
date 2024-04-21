"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedStudiesController = void 0;
const domain_1 = require("../../../domain");
const applied_studies_dto_1 = require("../../../domain/dtos/student/applied-studies/applied-studies.dto");
const applied_studies_1 = require("../../../domain/use-cases/student/applied-studies");
const helpers_1 = require("../../helpers");
class AppliedStudiesController {
    constructor(appliedStudiesRepository) {
        this.appliedStudiesRepository = appliedStudiesRepository;
        this.register = (req, res) => {
            const [error, appliedStudiesDto] = applied_studies_dto_1.AppliedStudiesDto.create(req.body);
            if (error)
                return res.status(400).json({ message: error });
            new applied_studies_1.RegisterUseCase(this.appliedStudiesRepository).execute(appliedStudiesDto)
                .then(appliedStudies => res.status(201).json(appliedStudies))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.update = (req, res) => {
            const { id } = req.params;
            const [error, optAppliedStudiesDto] = domain_1.OptionalAppliedStudiesDto.create(req.body, id);
            if (error)
                return res.status(400).json({ message: error });
            new applied_studies_1.UpdateUseCase(this.appliedStudiesRepository).execute(optAppliedStudiesDto)
                .then(appliedStudies => res.status(201).json(appliedStudies))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getByIdStudent = (req, res) => {
            const { studentId } = req.params;
            new applied_studies_1.GetByStudentIdUseCase(this.appliedStudiesRepository).execute(studentId)
                .then(appliedStudies => res.status(200).json(appliedStudies))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getById = (req, res) => {
            const { id } = req.params;
            new applied_studies_1.GetByIdUseCase(this.appliedStudiesRepository).execute(id)
                .then(appliedStudies => res.status(200).json(appliedStudies))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            new applied_studies_1.DeleteUseCase(this.appliedStudiesRepository).execute(id)
                .then(appliedStudies => res.status(200).json(appliedStudies))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
    }
}
exports.AppliedStudiesController = AppliedStudiesController;
