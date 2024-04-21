"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeMapper = void 0;
const domain_1 = require("../../../domain");
class PracticeMapper {
    static practiceEntityFromObject(object) {
        const { id, _id, modality } = object;
        if (!id && !_id)
            throw domain_1.CustomError.badRequest('Missing id');
        if (!modality)
            throw domain_1.CustomError.badRequest('Missing modality');
        return new domain_1.PracticeEntity(id || _id, modality);
    }
}
exports.PracticeMapper = PracticeMapper;
