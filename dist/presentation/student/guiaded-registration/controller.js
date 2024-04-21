"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuiadedRegistrationController = void 0;
const guiaded_registration_1 = require("../../../domain/use-cases/student/guiaded-registration");
const helpers_1 = require("../../helpers");
class GuiadedRegistrationController {
    constructor(guiadedRegistrationRepository) {
        this.guiadedRegistrationRepository = guiadedRegistrationRepository;
        this.register = (req, res) => {
            const { studentId } = req.body;
            new guiaded_registration_1.RegisterUseCase(this.guiadedRegistrationRepository).execute(Number(studentId))
                .then(guiadedRegistration => res.status(200).json(guiadedRegistration))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.delete = (req, res) => {
            const { studentId } = req.params;
            new guiaded_registration_1.DeleteUseCase(this.guiadedRegistrationRepository).execute(Number(studentId))
                .then(deleted => res.status(200).json(deleted))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getByStudentId = (req, res) => {
            const { studentId } = req.params;
            new guiaded_registration_1.GetGuiadedRegistrationUseCase(this.guiadedRegistrationRepository).execute(Number(studentId))
                .then(guiadedRegistration => res.status(200).json(guiadedRegistration))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
    }
}
exports.GuiadedRegistrationController = GuiadedRegistrationController;
