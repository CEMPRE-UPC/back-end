import { Router } from 'express';
import { showFile } from '../controllers/upload.controller';



const uploadRouter = Router();


uploadRouter.get('/:table/:typeInfo/:cedula/:typeFile', showFile);


export { uploadRouter }