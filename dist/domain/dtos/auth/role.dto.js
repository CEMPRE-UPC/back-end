"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleDto = void 0;
class RoleDto {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static create(body) {
        const { id, name } = body;
        if (!id)
            return ['Missing id'];
        if (!name)
            return ['Role is required'];
        return [undefined, new RoleDto(id, name)];
    }
}
exports.RoleDto = RoleDto;
