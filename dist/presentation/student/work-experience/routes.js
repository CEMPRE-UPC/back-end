"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkExperienceRouter = void 0;
const express_1 = require("express");
const repositories_1 = require("../../../infrastructure/repositories");
const datasources_1 = require("../../../infrastructure/datasources");
const controller_1 = require("./controller");
class WorkExperienceRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const repository = new repositories_1.WorkExperienceRepository(new datasources_1.WorkExperienceDataSource());
        const controller = new controller_1.WorkExperienceController(repository);
        router.post('/work-experience', controller.register);
        router.patch('/work-experience/:id', controller.update);
        router.get('/work-experience/all/:studentId', controller.getByStudentId);
        router.get('/work-experience/:id', controller.getById);
        router.delete('/work-experience/:id', controller.delete);
        return router;
    }
}
exports.WorkExperienceRouter = WorkExperienceRouter;
