"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageRouter = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const repositories_1 = require("../../../infrastructure/repositories");
const datasources_1 = require("../../../infrastructure/datasources");
const middlewares_1 = require("../../middlewares");
class LanguageRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const repository = new repositories_1.LanguageRepository(new datasources_1.LanguageDataSource());
        const controller = new controller_1.LanguageController(repository);
        const middleware = new middlewares_1.LanguageMiddleware(repository);
        router.post('/language', middleware.existLanguage, controller.register);
        router.patch('/language/:id', controller.update);
        router.get('/language/all/:studentId', controller.getLanguagesByStudentId);
        router.get('/language/:id', controller.getLanguageById);
        router.delete('/language/:id', controller.delete);
        return router;
    }
}
exports.LanguageRouter = LanguageRouter;
