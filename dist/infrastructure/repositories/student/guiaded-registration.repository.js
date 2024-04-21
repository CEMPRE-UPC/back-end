"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuiadedRegistrationRepository = void 0;
const domain_1 = require("../../../domain");
class GuiadedRegistrationRepository {
    constructor(guiadedRegistration) {
        this.guiadedRegistration = guiadedRegistration;
    }
    register(studentId) {
        if (!studentId) {
            throw domain_1.CustomError.badRequest('studentId is required');
        }
        return this.guiadedRegistration.register(studentId);
    }
    delete(studentId) {
        if (!studentId) {
            throw domain_1.CustomError.badRequest('studentId is required');
        }
        return this.guiadedRegistration.delete(studentId);
    }
    getByStudentId(studentId) {
        if (!studentId) {
            throw domain_1.CustomError.badRequest('studentId is required');
        }
        return this.guiadedRegistration.getByStudentId(studentId);
    }
}
exports.GuiadedRegistrationRepository = GuiadedRegistrationRepository;
