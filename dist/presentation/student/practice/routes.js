"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeRouter = void 0;
const express_1 = require("express");
const repositories_1 = require("../../../infrastructure/repositories");
const datasources_1 = require("../../../infrastructure/datasources");
const controller_1 = require("./controller");
class PracticeRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const repository = new repositories_1.PracticeRepository(new datasources_1.PracticeDataSource());
        const controller = new controller_1.PracticeController(repository);
        router.get('/practice/:id', controller.getPracticeById);
        router.get('/practice', controller.getAllPractices);
        router.get('/practice/:id', controller.delete);
        return router;
    }
}
exports.PracticeRouter = PracticeRouter;
