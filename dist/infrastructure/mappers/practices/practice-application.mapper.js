"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeApplicationMapper = void 0;
const domain_1 = require("../../../domain");
class PracticeApplicationMapper {
    static practiceApplicationEntityFromObject(body) {
        const { id, _id, studentId, identificationFile, photoFile, classScheduleFile, epsFile, graduationCertificateFile, companyRequestLetterFile, event, statusCempre, statusProgram, statusFaculty, observation, createdAt, updatedAt } = body;
        if (!id && !_id)
            throw domain_1.CustomError.badRequest('Id is required');
        if (!studentId)
            throw domain_1.CustomError.badRequest('Student id is required');
        if (identificationFile === null)
            throw domain_1.CustomError.badRequest('Identification file is required');
        if (photoFile === null)
            throw domain_1.CustomError.badRequest('Photo file is required');
        if (classScheduleFile === null)
            throw domain_1.CustomError.badRequest('Class schedule file is required');
        if (epsFile === null)
            throw domain_1.CustomError.badRequest('EPS file is required');
        if (graduationCertificateFile === null)
            throw domain_1.CustomError.badRequest('Graduation certificate file is required');
        if (companyRequestLetterFile === null)
            throw domain_1.CustomError.badRequest('Company request letter file is required');
        if (!event)
            throw domain_1.CustomError.badRequest('Event is required');
        if (!statusCempre)
            throw domain_1.CustomError.badRequest('Status Cempre is required');
        if (!statusProgram)
            throw domain_1.CustomError.badRequest('Status Program is required');
        if (!statusFaculty)
            throw domain_1.CustomError.badRequest('Status Faculty is required');
        if (!createdAt)
            throw domain_1.CustomError.badRequest('Created at is required');
        if (!updatedAt)
            throw domain_1.CustomError.badRequest('Updated at is required');
        return new domain_1.PracticeApplicationEntity(id || _id, identificationFile, photoFile, classScheduleFile, epsFile, graduationCertificateFile, companyRequestLetterFile, event, statusCempre, statusProgram, statusFaculty, observation, createdAt, updatedAt, studentId);
    }
}
exports.PracticeApplicationMapper = PracticeApplicationMapper;
