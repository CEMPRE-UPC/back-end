"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyDataSource = void 0;
const mysqldb_1 = require("../../../../data/mysqldb");
const domain_1 = require("../../../../domain");
const mappers_1 = require("../../../mappers");
class CompanyDataSource {
    register(CompanyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, startDate, endDate } = CompanyDto;
            try {
                const Company = mysqldb_1.CompanyModel.build({
                    name,
                    startDate,
                    endDate,
                });
                const savedCompany = yield Company.save();
                return mappers_1.CompanyMapper.CompanyEntityFromObject(savedCompany);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    update(optCompanyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, startDate, endDate } = optCompanyDto;
            try {
                const exist = yield mysqldb_1.CompanyModel.findOne({ where: { id } });
                if (!exist) {
                    throw domain_1.CustomError.notFound('Company not found');
                }
                const Company = yield mysqldb_1.CompanyModel.update({
                    name,
                    startDate,
                    endDate
                }, { where: { id } });
                console.log(Company.at(0));
                return Company.at(0) === 1;
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Company = yield mysqldb_1.CompanyModel.findByPk(id);
                if (!Company) {
                    return null;
                }
                return mappers_1.CompanyMapper.CompanyEntityFromObject(Company);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    getAllCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companies = yield mysqldb_1.CompanyModel.findAll();
                if (!companies) {
                    console.log('No companies found');
                    return null;
                }
                return companies.map(company => mappers_1.CompanyMapper.CompanyEntityFromObject(company));
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Company = yield mysqldb_1.CompanyModel.destroy({ where: { id } });
                return Company === 1;
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
}
exports.CompanyDataSource = CompanyDataSource;
