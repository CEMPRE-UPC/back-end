"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const repositories_1 = require("../../../infrastructure/repositories");
const datasources_1 = require("../../../infrastructure/datasources");
class KnowledgeRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const repository = new repositories_1.KnowledgeRepository(new datasources_1.KnowledgeDataSource());
        const controller = new controller_1.KnowledgeController(repository);
        router.post('/knowledge', controller.register);
        router.patch('/knowledge/:id', controller.update);
        router.get('/knowledge/:studentId', controller.getByStudentId);
        router.get('/knowledge/:id', controller.delete);
        return router;
    }
}
exports.KnowledgeRouter = KnowledgeRouter;
