import { Router } from 'express';
import { AuthRoutes } from './auth';
import { UploadRouter } from './upload';
import { StudentRouter } from './student/personal-data';
import { PracticeRouter } from './student/practice/routes';
import { WorkExperienceRouter } from './student/work-experience';
import { LanguageRouter } from './student/language';
import { UniversityStudiesRouter } from './student/university-studies';
import { AppliedStudiesRouter } from './student/applied-studies';
import { ProjectsRouter } from './student/projects';
import { KnowledgeRouter } from './student/knowledge';

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/upload', UploadRouter.routes);
        router.use('/api/student',[ 
            StudentRouter.routes, 
            PracticeRouter.routes, 
            WorkExperienceRouter.routes,
            LanguageRouter.routes, 
            UniversityStudiesRouter.routes,
            AppliedStudiesRouter.routes,
            ProjectsRouter.routes,
            KnowledgeRouter.routes
        ]);

        return router;
    } 
}