"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeAppicationRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const repositories_1 = require("../../infrastructure/repositories");
const datasources_1 = require("../../infrastructure/datasources");
const student_repository_1 = require("../../infrastructure/repositories/student/student.repository");
const middlewares_1 = require("../middlewares");
class PracticeAppicationRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const studentRepository = new student_repository_1.StudentRepository(new datasources_1.StudentDataSource());
        const studentMiddleware = new middlewares_1.StudentMiddleware(studentRepository);
        const repository = new repositories_1.PracticeApplicationRepository(new datasources_1.PracticeApplicationDataSource());
        const controller = new controller_1.PracticeApplicationController(repository);
        router.post('/', studentMiddleware.notfoundStudent, controller.register);
        router.get('/:studentId', controller.getByStudentId);
        router.patch('/:id', controller.update);
        return router;
    }
}
exports.PracticeAppicationRouter = PracticeAppicationRouter;
