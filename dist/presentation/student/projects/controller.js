"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const student_1 = require("../../../domain/dtos/student");
const projects_1 = require("../../../domain/use-cases/student/projects");
const helpers_1 = require("../../helpers");
class ProjectsController {
    constructor(projectsRepository) {
        this.projectsRepository = projectsRepository;
        this.register = (req, res) => {
            const [error, projectsDto] = student_1.ProjectsDto.create(req.body);
            if (error)
                return res.status(400).json({ message: error });
            new projects_1.RegisterUseCase(this.projectsRepository).execute(projectsDto)
                .then(project => res.status(201).json(project))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.update = (req, res) => {
            const { id } = req.params;
            const [error, optProjectsDto] = student_1.OptionalProjectsDto.create(req.body, id);
            if (error)
                return res.status(400).json({ message: error });
            new projects_1.UpdateUseCase(this.projectsRepository).execute(optProjectsDto)
                .then(updated => res.status(200).json(updated))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getByStudentId = (req, res) => {
            const { studentId } = req.params;
            new projects_1.GetProjectsUseCase(this.projectsRepository).execute(studentId)
                .then(projects => res.status(200).json(projects))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getById = (req, res) => {
            const { id } = req.params;
            new projects_1.GetProjectById(this.projectsRepository).execute(id)
                .then(project => res.status(200).json(project))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            new projects_1.DeleteUseCase(this.projectsRepository).execute(id)
                .then(deleted => res.status(200).json(deleted))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
    }
}
exports.ProjectsController = ProjectsController;
