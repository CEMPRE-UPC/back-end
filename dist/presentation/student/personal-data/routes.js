"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const datasources_1 = require("../../../infrastructure/datasources");
const repositories_1 = require("../../../infrastructure/repositories");
const middlewares_1 = require("../../middlewares");
class StudentRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new datasources_1.StudentDataSource();
        const repository = new repositories_1.StudentRepository(datasource);
        const controller = new controller_1.StudentController(repository);
        const middleware = new middlewares_1.StudentMiddleware(repository);
        router.post('/personal-data', middleware.existStudent, controller.register);
        router.get('/personal-data/all/', controller.getAllStudents);
        router.patch('/personal-data/:cedula', middleware.notfoundStudent, controller.update);
        router.get('/personal-data/:cedula', middleware.notfoundStudent, controller.getStudentByCedula);
        router.get('/personal-data/user/:id', controller.getStudentByIdUser);
        // router.get('/personal-data/:id', controller.delete);
        return router;
    }
}
exports.StudentRouter = StudentRouter;
