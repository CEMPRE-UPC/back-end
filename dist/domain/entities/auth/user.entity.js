"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor(id, email, password, isActive, role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.isActive = isActive;
        this.role = role;
    }
}
exports.UserEntity = UserEntity;
