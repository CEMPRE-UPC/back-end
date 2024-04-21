"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedStudiesRouter = void 0;
const express_1 = require("express");
const datasources_1 = require("../../../infrastructure/datasources");
const repositories_1 = require("../../../infrastructure/repositories");
const controller_1 = require("./controller");
class AppliedStudiesRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const repository = new repositories_1.AppliedStudiesRepository(new datasources_1.AppliedStudiesDataSource());
        const controller = new controller_1.AppliedStudiesController(repository);
        router.post('/applied-studies', controller.register);
        router.patch('/applied-studies/:id', controller.update);
        router.get('/applied-studies/all/:studentId', controller.getByIdStudent);
        router.get('/applied-studies/:id', controller.getById);
        router.delete('/applied-studies/:id', controller.delete);
        return router;
    }
}
exports.AppliedStudiesRouter = AppliedStudiesRouter;
