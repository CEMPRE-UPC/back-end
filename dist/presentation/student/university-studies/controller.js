"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityStudiesController = void 0;
const domain_1 = require("../../../domain");
const university_studies_1 = require("../../../domain/use-cases/student/university-studies");
const helpers_1 = require("../../helpers");
class UniversityStudiesController {
    constructor(universityStudiesRepository) {
        this.universityStudiesRepository = universityStudiesRepository;
        this.register = (req, res) => {
            const [error, universityStudiesDto] = domain_1.UniversityStudiesDto.create(req.body);
            if (error)
                return res.status(400).json({ message: error });
            new university_studies_1.RegisterUseCase(this.universityStudiesRepository).execute(universityStudiesDto)
                .then(universityStudies => res.status(201).json(universityStudies))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.update = (req, res) => {
            const [error, optUniversityStudiesDto] = domain_1.OptionalUniversityStudiesDto.create(req.body, req.params.id);
            if (error)
                return res.status(400).json({ message: error });
            new university_studies_1.UpdateUseCase(this.universityStudiesRepository).execute(optUniversityStudiesDto)
                .then(universityStudies => res.status(200).json(universityStudies))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getByStudentId = (req, res) => {
            const studentId = req.params.studentId;
            new university_studies_1.GetByStudentIdUseCase(this.universityStudiesRepository).execute(studentId)
                .then(universityStudies => res.status(200).json(universityStudies))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            new university_studies_1.DeleteUseCase(this.universityStudiesRepository).execute(id)
                .then(deleted => res.status(200).json(deleted))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
    }
}
exports.UniversityStudiesController = UniversityStudiesController;
