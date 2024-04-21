"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeminarsOrCoursesRouter = void 0;
const express_1 = require("express");
const repositories_1 = require("../../../infrastructure/repositories");
const datasources_1 = require("../../../infrastructure/datasources");
const controller_1 = require("./controller");
class SeminarsOrCoursesRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const repository = new repositories_1.SeminarsOrCoursesRepository(new datasources_1.SeminarsOrCoursesDataSource());
        const controller = new controller_1.SeminarsOrCoursesController(repository);
        router.post('/seminars-courses/', controller.register);
        router.patch('/seminars-courses/:id', controller.update);
        router.get('/seminars-courses/all/:studentId', controller.getByStudentId);
        router.get('/seminars-courses/:id', controller.getById);
        router.delete('/seminars-courses/:id', controller.delete);
        return router;
    }
}
exports.SeminarsOrCoursesRouter = SeminarsOrCoursesRouter;
