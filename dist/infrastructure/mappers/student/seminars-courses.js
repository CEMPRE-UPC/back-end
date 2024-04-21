"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeminarsOrCoursesMapper = void 0;
const domain_1 = require("../../../domain");
class SeminarsOrCoursesMapper {
    static seminarsOrCoursesEntityFromObject(object) {
        const { id, _id, topic, institution, date } = object;
        if (!id && !_id)
            throw domain_1.CustomError.badRequest('Missing id');
        if (!topic)
            throw domain_1.CustomError.badRequest('Missing topic');
        if (!institution)
            throw domain_1.CustomError.badRequest('Missing institution');
        if (!date)
            throw domain_1.CustomError.badRequest('Missing date');
        return new domain_1.SeminarsOrCoursesEntity(id || _id, topic, institution, date.toISOString().split('T')[0]);
    }
}
exports.SeminarsOrCoursesMapper = SeminarsOrCoursesMapper;
