"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
class AuthRepository {
    constructor(authDataSource) {
        this.authDataSource = authDataSource;
    }
    login(loginUserDto) {
        return this.authDataSource.login(loginUserDto);
    }
    register(registerUserDto) {
        return this.authDataSource.register(registerUserDto);
    }
    activateAccount(id) {
        return this.authDataSource.activateAccount(id);
    }
    getUserById(id) {
        return this.authDataSource.getUserById(id);
    }
    getUserByEmail(email) {
        return this.authDataSource.getUserByEmail(email);
    }
}
exports.AuthRepository = AuthRepository;
