"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuiadedRegistrationRouter = void 0;
const express_1 = require("express");
const repositories_1 = require("../../../infrastructure/repositories");
const datasources_1 = require("../../../infrastructure/datasources");
const controller_1 = require("./controller");
const middlewares_1 = require("../../middlewares");
class GuiadedRegistrationRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const studentRepository = new repositories_1.StudentRepository(new datasources_1.StudentDataSource());
        const repository = new repositories_1.GuiadedRegistrationRepository(new datasources_1.GuiadedRegistrationDataSource());
        const controller = new controller_1.GuiadedRegistrationController(repository);
        const studentMiddleware = new middlewares_1.StudentMiddleware(studentRepository);
        router.post('/guiaded-registration', studentMiddleware.notfoundStudent, controller.register);
        router.delete('/guiaded-registration/:studentId', controller.delete);
        router.get('/guiaded-registration/:studentId', controller.getByStudentId);
        return router;
    }
}
exports.GuiadedRegistrationRouter = GuiadedRegistrationRouter;
