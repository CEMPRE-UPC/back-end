import { Router } from 'express';
import { AuthController } from './controller';
import { AuthRepository, RoleRepository } from '../../infrastructure/repositories';
import { AuthDataSource } from '../../infrastructure/datasources/mysql/auth/auth.datasource';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { RoleDataSouce } from '../../infrastructure/datasources/mysql/auth/role.datasource';


export class AuthRoutes {


    static get routes(): Router {

        const router = Router();        

        const datasource = new AuthDataSource();
        const repository = new AuthRepository( datasource );
        const controller = new AuthController( repository );

        // Middlewares
        const roleMiddleware = new RoleMiddleware(new RoleRepository( new RoleDataSouce()));

        router.post('/login', controller.login);

        router.post('/register',roleMiddleware.validateRole, controller.register)

        router.get('/check-token', controller.checkToken)

        return router;
    }
}