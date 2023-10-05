import { Router } from 'express';
import { savePersonalData } from '../controllers/stundet.controller';
import { validateUploadFiles } from '../middlewares/validate-files';
import { validateFields } from '../middlewares/validate-fields';

const studentRouter = Router();

studentRouter.post('/personal-data', 
validateUploadFiles, 
validateFields, 
savePersonalData);


export { studentRouter };