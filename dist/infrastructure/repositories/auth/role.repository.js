"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
class RoleRepository {
    constructor(roleDataSource) {
        this.roleDataSource = roleDataSource;
    }
    getRoleByName(name) {
        return this.roleDataSource.getRoleByName(name);
    }
}
exports.RoleRepository = RoleRepository;
