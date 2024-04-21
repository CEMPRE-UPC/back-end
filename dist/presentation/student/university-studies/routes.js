"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniversityStudiesRouter = void 0;
const express_1 = require("express");
const repositories_1 = require("../../../infrastructure/repositories");
const datasources_1 = require("../../../infrastructure/datasources");
const controller_1 = require("./controller");
class UniversityStudiesRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const repository = new repositories_1.UniversityStudiesRepository(new datasources_1.UniversityStudiesDataSource());
        const controller = new controller_1.UniversityStudiesController(repository);
        router.post('/university-studies', controller.register);
        router.patch('/university-studies/:id', controller.update);
        router.get('/university-studies/:studentId', controller.getByStudentId);
        router.get('/university-studies/:id', controller.delete);
        return router;
    }
}
exports.UniversityStudiesRouter = UniversityStudiesRouter;
