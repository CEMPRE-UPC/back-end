import { Router } from 'express';
import { showFile } from '../controllers/upload.controller';



const uploadRouter = Router();


uploadRouter.get('/:typeUser/:typeInfo/:cedula/:file', showFile);


export { uploadRouter }