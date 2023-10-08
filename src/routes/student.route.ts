import { Router } from 'express';
import { getAllStudents, getStudentByIdUser, saveStudent, updateStudent } from '../controllers/stundet.controller';
import { validateUploadFiles } from '../middlewares/validate-files';
import { validateFields } from '../middlewares/validate-fields';

const studentRouter = Router();

studentRouter.post('/personal-data', 
validateUploadFiles, 
validateFields, 
saveStudent);

studentRouter.get('/personal-data', getAllStudents);

studentRouter.get('/personal-data/:id', getStudentByIdUser);

studentRouter.patch('/personal-data', validateUploadFiles, validateFields, updateStudent);

export { studentRouter };