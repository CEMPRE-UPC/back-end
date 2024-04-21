"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyMapper = void 0;
const domain_1 = require("../../../domain");
class CompanyMapper {
    static CompanyEntityFromObject(object) {
        const { id, _id, name, startDate, endDate, } = object;
        if (!id && !_id) {
            throw domain_1.CustomError.badRequest('Invalid object');
        }
        if (!name)
            throw domain_1.CustomError.badRequest('Missing name');
        if (!startDate)
            throw domain_1.CustomError.badRequest('Missing startDate');
        if (!endDate)
            throw domain_1.CustomError.badRequest('Missing endDate');
        return new domain_1.CompanyEntity(_id || id, name, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]);
    }
}
exports.CompanyMapper = CompanyMapper;
