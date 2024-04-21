"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const domain_1 = require("../../../domain");
const role_mapper_1 = require("./role.mapper");
class UserMapper {
    static userEntityFromObject(object) {
        const { id, _id, email, password, isActive, role, roles } = object;
        if (!_id && !id) {
            throw domain_1.CustomError.badRequest('Missing id');
        }
        if (!email)
            throw domain_1.CustomError.badRequest('Missing email');
        if (!password)
            throw domain_1.CustomError.badRequest('Missing password');
        if (isActive === undefined)
            throw domain_1.CustomError.badRequest('Missing isActive');
        return new domain_1.UserEntity(_id || id, email, password, isActive, (role || roles) && role_mapper_1.RoleMapper.roleEntityFromObject(role !== null && role !== void 0 ? role : roles));
    }
}
exports.UserMapper = UserMapper;
