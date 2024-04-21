"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaInterestRouter = void 0;
const express_1 = require("express");
const repositories_1 = require("../../../infrastructure/repositories");
const datasources_1 = require("../../../infrastructure/datasources");
const controller_1 = require("./controller");
class AreaInterestRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const repository = new repositories_1.AreaInterestRepository(new datasources_1.AreaInterestDataSource());
        const controller = new controller_1.AreaInterestController(repository);
        router.post('/area-interest', controller.register);
        router.patch('/area-interest/:id', controller.update);
        router.get('/area-interest/:studentId', controller.getByStudentId);
        router.get('/area-interest/:id', controller.delete);
        return router;
    }
}
exports.AreaInterestRouter = AreaInterestRouter;
