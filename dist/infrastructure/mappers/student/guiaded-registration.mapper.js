"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuiadedRegistrationMapper = void 0;
const domain_1 = require("../../../domain");
class GuiadedRegistrationMapper {
    static guiadedRegistrationEntityFromObject(body) {
        const { id, _id, studentId } = body;
        if (!id && !_id)
            throw domain_1.CustomError.badRequest('Id is required');
        if (!studentId)
            throw domain_1.CustomError.badRequest('Student id is required');
        return new domain_1.GuiadedRegistrationEntity(id || _id, studentId);
    }
}
exports.GuiadedRegistrationMapper = GuiadedRegistrationMapper;
