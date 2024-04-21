"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkExperienceController = void 0;
const domain_1 = require("../../../domain");
const work_experience_1 = require("../../../domain/use-cases/student/work-experience");
const helpers_1 = require("../../helpers");
class WorkExperienceController {
    constructor(workExperienceRepository) {
        this.workExperienceRepository = workExperienceRepository;
        this.register = (req, res) => {
            const [error, workExperienceDto] = domain_1.WorkExperienceDto.create(req.body);
            if (error)
                return res.status(400).json({ message: error });
            new work_experience_1.RegisterUseCase(this.workExperienceRepository).execute(workExperienceDto)
                .then(workExperience => res.status(201).json(workExperience))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.update = (req, res) => {
            const { id } = req.params;
            const [error, optWorkExperienceDto] = domain_1.OptionalWorkExperienceDto.create(req.body, id);
            if (error)
                return res.status(400).json({ message: error });
            new work_experience_1.UpdateWorkExperienceUseCase(this.workExperienceRepository).execute(optWorkExperienceDto)
                .then(workExperience => res.status(200).json(workExperience))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getById = (req, res) => {
            const { id } = req.params;
            new work_experience_1.GetExperienceById(this.workExperienceRepository).execute(id)
                .then(workExperience => res.status(200).json(workExperience))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getByStudentId = (req, res) => {
            const { studentId } = req.params;
            new work_experience_1.GetWorkExperiencesUseCase(this.workExperienceRepository).execute(studentId)
                .then(workExperiences => res.status(200).json(workExperiences))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            new work_experience_1.DeleteUseCase(this.workExperienceRepository).execute(id)
                .then(deleted => res.status(200).json(deleted))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
    }
}
exports.WorkExperienceController = WorkExperienceController;
