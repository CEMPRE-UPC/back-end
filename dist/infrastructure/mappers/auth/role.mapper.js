"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMapper = void 0;
const domain_1 = require("../../../domain");
class RoleMapper {
    static roleEntityFromObject(object) {
        const { id, _id, name } = object;
        if (!_id && !id) {
            throw domain_1.CustomError.badRequest('Missing id');
        }
        if (!name)
            throw domain_1.CustomError.badRequest('Missing name');
        return new domain_1.RoleEntity(_id || id, name);
    }
}
exports.RoleMapper = RoleMapper;
