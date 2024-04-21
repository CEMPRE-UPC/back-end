"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const domain_1 = require("../../domain");
const company_1 = require("../../domain/use-cases/cempre-admin/company");
const helpers_1 = require("../helpers");
class CompanyController {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
        this.register = (req, res) => {
            const [error, companyDto] = domain_1.CompanyDto.create(req.body);
            if (error)
                return res.status(400).json({ message: error });
            new company_1.RegisterUseCase(this.companyRepository).execute(companyDto)
                .then(company => res.status(201).json(company))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getCompanyById = (req, res) => {
            const { id } = req.params;
            new company_1.GetCompanyById(this.companyRepository).execute(id)
                .then(company => res.status(200).json(company))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.getAllCompanies = (req, res) => {
            new company_1.GetAllCompaniesUseCase(this.companyRepository).execute()
                .then(companies => res.status(200).json(companies))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.delete = (req, res) => {
            const { id } = req.params;
            new company_1.DeleteCompanyUseCase(this.companyRepository).execute(id)
                .then(company => res.status(200).json(company))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.update = (req, res) => {
            const { id } = req.params;
            const [error, optCompanyDto] = domain_1.OptionalCompanyDto.create(req.body, id);
            if (error)
                return res.status(400).json({ message: error });
            new company_1.UpdateCompanyUseCase(this.companyRepository).execute(optCompanyDto)
                .then(company => res.status(200).json(company))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
    }
}
exports.CompanyController = CompanyController;
