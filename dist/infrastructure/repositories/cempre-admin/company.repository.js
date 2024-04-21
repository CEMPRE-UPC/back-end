"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRespository = void 0;
class CompanyRespository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    register(registerCompanyDto) {
        return this.dataSource.register(registerCompanyDto);
    }
    update(optCompanyDto) {
        return this.dataSource.update(optCompanyDto);
    }
    getById(id) {
        return this.dataSource.getById(id);
    }
    delete(id) {
        return this.dataSource.delete(id);
    }
    getAllCompanies() {
        return this.dataSource.getAllCompanies();
    }
}
exports.CompanyRespository = CompanyRespository;
