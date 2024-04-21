"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedStudiesMapper = void 0;
const domain_1 = require("../../../domain");
class AppliedStudiesMapper {
    static appliedStudiesEntityFromObject(object) {
        const { id, _id, level, institution, collegeDegree, date } = object;
        if (!id && !_id) {
            throw domain_1.CustomError.badRequest('Invalid object');
        }
        if (!level)
            throw domain_1.CustomError.badRequest('Missing level');
        if (!institution)
            throw domain_1.CustomError.badRequest('Missing institution');
        if (!collegeDegree)
            throw domain_1.CustomError.badRequest('Missing college degree');
        if (!date)
            throw domain_1.CustomError.badRequest('Missing date');
        return new domain_1.AppliedStudiesEntity(_id || id, level, institution, collegeDegree, date.toISOString().split('T')[0]);
    }
}
exports.AppliedStudiesMapper = AppliedStudiesMapper;
