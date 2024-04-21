"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityStudiesMapper = void 0;
const domain_1 = require("../../../domain");
class UniversityStudiesMapper {
    static universityStudiesEntityFromObject(object) {
        const { id, _id, institution, program, semester } = object;
        if (!id && !_id) {
            throw domain_1.CustomError.badRequest('Invalid object');
        }
        if (!institution)
            throw domain_1.CustomError.badRequest('Missing institution');
        if (!program)
            throw domain_1.CustomError.badRequest('Missing program');
        if (!semester)
            throw domain_1.CustomError.badRequest('Missing semester');
        return new domain_1.UniversityStudiesEntity(_id || id, institution, program, semester);
    }
}
exports.UniversityStudiesMapper = UniversityStudiesMapper;
