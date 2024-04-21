"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRouter = void 0;
const express_1 = require("express");
const repositories_1 = require("../../infrastructure/repositories");
const company_datasource_1 = require("../../infrastructure/datasources/mysql/cempre-admin/company.datasource");
const controller_1 = require("./controller");
class CompanyRouter {
    static get router() {
        const router = (0, express_1.Router)();
        const repository = new repositories_1.CompanyRespository(new company_datasource_1.CompanyDataSource());
        const controller = new controller_1.CompanyController(repository);
        router.post('/', controller.register);
        router.get('/:id', controller.getCompanyById);
        router.get('/', controller.getAllCompanies);
        router.delete('/:id', controller.delete);
        router.patch('/:id', controller.update);
        return router;
    }
}
exports.CompanyRouter = CompanyRouter;
