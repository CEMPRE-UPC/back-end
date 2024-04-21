"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeminarsOrCoursesController = void 0;
const domain_1 = require("../../../domain");
const seminars_courses_1 = require("../../../domain/use-cases/student/seminars-courses");
const helpers_1 = require("../../helpers");
class SeminarsOrCoursesController {
    constructor(seminarsOrCoursesRepository) {
        this.seminarsOrCoursesRepository = seminarsOrCoursesRepository;
        this.register = (req, res) => {
            const [error, seminarsOrCoursesDto] = domain_1.SeminarsOrCoursesDto.create(req.body);
            if (error)
                return res.status(400).json({ message: error });
            new seminars_courses_1.RegisterUseCase(this.seminarsOrCoursesRepository).execute(seminarsOrCoursesDto)
                .then(seminarsOrCoursesEntity => res.status(201).json(seminarsOrCoursesEntity))
                .catch(err => (0, helpers_1.handleError)(err, res));
        };
        this.update = (req, res) => {
            const { id } = req.params;
            const [error, optSeminarsOrCoursesDto] = domain_1.OptionalSeminarsOrCoursesDto.create(req.body, id);
            if (error)
                return res.status(400).json({ message: error });
            new seminars_courses_1.UpdateUseCase(this.seminarsOrCoursesRepository).execute(optSeminarsOrCoursesDto)
                .then(result => res.status(200).json(result))
                .catch(err => (0, helpers_1.handleError)(err, res));
        };
        this.getByStudentId = (req, res) => {
            const { studentId } = req.params;
            new seminars_courses_1.GetByStudentIdUseCase(this.seminarsOrCoursesRepository).execute(studentId)
                .then(seminarsOrCourses => res.status(200).json(seminarsOrCourses))
                .catch(err => (0, helpers_1.handleError)(err, res));
        };
        this.getById = (req, res) => {
            const { id } = req.params;
            new seminars_courses_1.GetByIdUseCase(this.seminarsOrCoursesRepository).execute(id)
                .then(seminarsOrCourses => res.status(200).json(seminarsOrCourses))
                .catch(err => (0, helpers_1.handleError)(err, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            new seminars_courses_1.DeleteUseCase(this.seminarsOrCoursesRepository).execute(id)
                .then(result => res.status(200).json(result))
                .catch(err => (0, helpers_1.handleError)(err, res));
        };
    }
}
exports.SeminarsOrCoursesController = SeminarsOrCoursesController;
