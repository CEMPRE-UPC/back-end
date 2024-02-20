import { Request, Response } from 'express';

import { CompanyDto, ICompanyRepository, OptionalCompanyDto } from '../../domain';
import { RegisterUseCase, GetCompanyById, GetAllCompaniesUseCase, DeleteCompanyUseCase, UpdateCompanyUseCase } from '../../domain/use-cases/cempre-admin/company';
import { handleError } from '../helpers';


export class CompanyController {

    constructor(
        private companyRepository: ICompanyRepository
    ) {}

    register = ( req: Request, res: Response ) => {
            
            const [ error, companyDto ] = CompanyDto.create(req.body);
    
            if(error) return res.status(400).json({ message: error });
    
            new RegisterUseCase( this.companyRepository ).execute(companyDto!)
                .then( company => res.status(201).json(company) )
                .catch( error => handleError(error, res) );
    }

    getCompanyById = ( req: Request, res: Response ) => {
        
        const { id } = req.params;
        
        new GetCompanyById( this.companyRepository ).execute(id)
        .then( company => res.status(200).json(company) )
        .catch( error => handleError(error, res) );
    }
    
    getAllCompanies = ( req: Request, res: Response ) => {

            new GetAllCompaniesUseCase( this.companyRepository ).execute()
                .then( companies => res.status(200).json(companies) )
                .catch( error => handleError(error, res) );
    }

    delete = ( req: Request, res: Response ) => {
        
        const { id } = req.params;
        
        new DeleteCompanyUseCase( this.companyRepository ).execute(id)
        .then( company => res.status(200).json(company) )
        .catch( error => handleError(error, res) );
    }

    update = ( req: Request, res: Response ) => {
            
            const { id } = req.params;
            
            const [ error, optCompanyDto ] = OptionalCompanyDto.create(req.body, id);
            
            if(error) return res.status(400).json({ message: error });
            
            new UpdateCompanyUseCase( this.companyRepository ).execute(optCompanyDto!)
                .then( company => res.status(200).json(company) )
                .catch( error => handleError(error, res) );
    }
}