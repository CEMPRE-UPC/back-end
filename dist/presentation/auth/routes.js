"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const repositories_1 = require("../../infrastructure/repositories");
const auth_datasource_1 = require("../../infrastructure/datasources/mysql/auth/auth.datasource");
const role_middleware_1 = require("../middlewares/role.middleware");
const role_datasource_1 = require("../../infrastructure/datasources/mysql/auth/role.datasource");
const middlewares_1 = require("../middlewares");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new auth_datasource_1.AuthDataSource();
        const repository = new repositories_1.AuthRepository(datasource);
        const controller = new controller_1.AuthController(repository);
        // Middlewares
        const roleMiddleware = new role_middleware_1.RoleMiddleware(new repositories_1.RoleRepository(new role_datasource_1.RoleDataSouce()));
        const authMiddleware = new middlewares_1.AuthMiddleware(repository);
        router.post('/login', controller.login);
        router.post('/register', roleMiddleware.validateRole, authMiddleware.existUser, controller.register);
        router.get('/activate-account', controller.activateAccount);
        router.get('/check-token', controller.checkToken);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
