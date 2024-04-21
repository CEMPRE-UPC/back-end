"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentMapper = void 0;
const domain_1 = require("../../../domain");
class StudentMapper {
    static studentEntityFromObject(object) {
        var _a, _b;
        const modality = (_a = object === null || object === void 0 ? void 0 : object.PracticeModel) === null || _a === void 0 ? void 0 : _a.modality;
        const program = (_b = object === null || object === void 0 ? void 0 : object.UniversityStudiesModel) === null || _b === void 0 ? void 0 : _b.program;
        const practiceApplication = object === null || object === void 0 ? void 0 : object.PracticeApplicationModel;
        const { _id, id, cedula, firstName, secondName, lastName, middleName, birthDate, placeOfBirth, martialStatus, address, phone, eps, email, city, userId, practiceId, } = object;
        if (!_id && !id)
            throw domain_1.CustomError.badRequest('Missing id');
        if (!cedula)
            throw domain_1.CustomError.badRequest('Missing cedula');
        if (!firstName)
            throw domain_1.CustomError.badRequest('Missing firstName');
        if (!lastName)
            throw domain_1.CustomError.badRequest('Missing lastName');
        if (!middleName)
            throw domain_1.CustomError.badRequest('Missing middleName');
        if (!birthDate)
            throw domain_1.CustomError.badRequest('Missing birthDate');
        if (!placeOfBirth)
            throw domain_1.CustomError.badRequest('Missing placeOfBirth');
        if (!martialStatus)
            throw domain_1.CustomError.badRequest('Missing martialStatus');
        if (!address)
            throw domain_1.CustomError.badRequest('Missing address');
        if (!phone)
            throw domain_1.CustomError.badRequest('Missing phone');
        if (!eps)
            throw domain_1.CustomError.badRequest('Missing eps');
        if (!email)
            throw domain_1.CustomError.badRequest('Missing email');
        if (!city)
            throw domain_1.CustomError.badRequest('Missing city');
        return new domain_1.StudentEntity(_id || id, cedula, firstName, secondName, lastName, middleName, birthDate.toISOString().split('T')[0], placeOfBirth, martialStatus, address, phone, eps, email, city, userId, practiceId, program, modality, practiceApplication);
    }
}
exports.StudentMapper = StudentMapper;
