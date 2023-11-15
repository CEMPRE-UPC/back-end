import { Router } from 'express';
import { ProjectsRepository } from '../../../infrastructure/repositories';
import { ProjectsDataSource } from '../../../infrastructure/datasources';
import { ProjectsController } from './controller';


export class ProjectsRouter {

    static get routes(): Router {

        const router = Router();

        const repository = new ProjectsRepository( new ProjectsDataSource() );
        const controller = new ProjectsController( repository );

        router.post('/projects', controller.register);
        router.patch('/projects/:id', controller.update);
        router.get('/projects/:studentId', controller.getByStudentId);

        return router;
    }
}