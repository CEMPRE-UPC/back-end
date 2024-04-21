"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsRouter = void 0;
const express_1 = require("express");
const repositories_1 = require("../../../infrastructure/repositories");
const datasources_1 = require("../../../infrastructure/datasources");
const controller_1 = require("./controller");
class ProjectsRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const repository = new repositories_1.ProjectsRepository(new datasources_1.ProjectsDataSource());
        const controller = new controller_1.ProjectsController(repository);
        router.post('/projects', controller.register);
        router.patch('/projects/:id', controller.update);
        router.get('/projects/all/:studentId', controller.getByStudentId);
        router.get('/projects/:id', controller.getById);
        router.delete('/projects/:id', controller.delete);
        return router;
    }
}
exports.ProjectsRouter = ProjectsRouter;
