import { Router } from 'express';
import { CompanyRespository } from '../../infrastructure/repositories';
import { CompanyDataSource } from '../../infrastructure/datasources/mysql/cempre-admin/company.datasource';
import { CompanyController } from './controller';

export class CompanyRouter {

    static get router(): Router {
            
            const router = Router();
    
            const repository = new CompanyRespository( new CompanyDataSource() );
    
            const controller = new CompanyController( repository );
    
            router.post('/', controller.register);
            router.get('/:id', controller.getCompanyById);
            router.get('/', controller.getAllCompanies);
            router.delete('/:id', controller.delete);
            router.patch('/:id', controller.update);
    
            return  router;
    }
}