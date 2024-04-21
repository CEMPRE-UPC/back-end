"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaInterestMapper = void 0;
const domain_1 = require("../../../domain");
class AreaInterestMapper {
    static areaInterestEntityFromObject(body) {
        const { id, _id, description } = body;
        if (!id && !_id)
            throw domain_1.CustomError.badRequest('Id is required');
        if (!description)
            throw domain_1.CustomError.badRequest('Description is required');
        return new domain_1.AreaInterestEntity(id || _id, description);
    }
}
exports.AreaInterestMapper = AreaInterestMapper;
