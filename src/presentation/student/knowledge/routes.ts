import { Router } from 'express';
import { KnowledgeController } from './controller';
import { KnowledgeRepository } from '../../../infrastructure/repositories';
import { KnowledgeDataSource } from '../../../infrastructure/datasources';


export class KnowledgeRouter {

    static get routes(): Router {

        const router = Router();

        const repository = new KnowledgeRepository( new KnowledgeDataSource() );
        const controller = new KnowledgeController( repository );

        router.post('/knowledge', controller.register);
        router.patch('/knowledge/:id', controller.update);
        router.get('/knowledge/:studentId', controller.getByStudentId);

        return router;
    }
}