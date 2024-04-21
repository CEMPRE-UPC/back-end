"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkExperienceMapper = void 0;
const domain_1 = require("../../../domain");
class WorkExperienceMapper {
    static workExperienceEntityFromObject(object) {
        const { id, _id, company, position, functions, startDate, endDate, } = object;
        if (!id && !_id) {
            throw domain_1.CustomError.badRequest('Invalid object');
        }
        if (!company)
            throw domain_1.CustomError.badRequest('Missing company');
        if (!position)
            throw domain_1.CustomError.badRequest('Missing position');
        if (!functions)
            throw domain_1.CustomError.badRequest('Missing functions');
        if (!startDate)
            throw domain_1.CustomError.badRequest('Missing startDate');
        if (!endDate)
            throw domain_1.CustomError.badRequest('Missing endDate');
        return new domain_1.WorkExperienceEntity(_id || id, company, position, functions, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
    }
}
exports.WorkExperienceMapper = WorkExperienceMapper;
