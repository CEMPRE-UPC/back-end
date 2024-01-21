import { Router } from 'express';
import { WorkExperienceRepository } from '../../../infrastructure/repositories';
import { WorkExperienceDataSource } from '../../../infrastructure/datasources';
import { WorkExperienceController } from './controller';



export class WorkExperienceRouter {

    static get routes(): Router {

        const router = Router();

        const repository = new WorkExperienceRepository( new WorkExperienceDataSource() );

        const controller = new WorkExperienceController( repository );


        router.post('/work-experience', controller.register);
        router.patch('/work-experience/:id', controller.update);
        router.get('/work-experience/all/:studentId', controller.getByStudentId);
        router.get('/work-experience/:id', controller.getById);
        router.delete('/work-experience/:id', controller.delete);


        return  router;
    }

}