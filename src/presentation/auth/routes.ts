import { Router } from 'express';
import { AuthController } from './controller';
import { AuthRepository, RoleRepository } from '../../infrastructure/repositories';
import { AuthDataSource } from '../../infrastructure/datasources/mysql/auth/auth.datasource';
import { RoleMiddleware } from '../middlewares/role.middleware';
import { RoleDataSouce } from '../../infrastructure/datasources/mysql/auth/role.datasource';
import { AuthMiddleware } from '../middlewares';


export class AuthRoutes {


    static get routes(): Router {

        const router = Router();        

        const datasource = new AuthDataSource();
        const repository = new AuthRepository( datasource );
        const controller = new AuthController( repository );

        // Middlewares
        const roleMiddleware = new RoleMiddleware(new RoleRepository( new RoleDataSouce()));
        const authMiddleware = new AuthMiddleware( repository );

        router.post('/login', controller.login);

        router.post('/register',roleMiddleware.validateRole, authMiddleware.existUser, controller.register)

        router.get('/activate-account', controller.activateAccount)

        router.get('/check-token', controller.checkToken)

        return router;
    }
}