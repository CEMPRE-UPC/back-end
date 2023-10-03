import { Router } from 'express';
import { savePersonalData } from '../controllers/stundet.controller';
import { validateUploadFiles } from '../middlewares/validate-files';

const studentRouter = Router();

studentRouter.post('/personal-data', validateUploadFiles, savePersonalData);


export { studentRouter };