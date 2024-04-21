"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeMapper = void 0;
const domain_1 = require("../../../domain");
class KnowledgeMapper {
    static knowledgeEntityFromObject(object) {
        const { id, _id, description } = object;
        if (!id && !_id) {
            throw domain_1.CustomError.badRequest('Invalid object');
        }
        if (!description)
            throw domain_1.CustomError.badRequest('Missing description');
        return new domain_1.KnowledgeEntity(_id || id, description);
    }
}
exports.KnowledgeMapper = KnowledgeMapper;
