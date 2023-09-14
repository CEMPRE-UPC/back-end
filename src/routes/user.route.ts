import { Router } from 'express';
import { getUsers, saveUser } from '../controllers/user.controller';
import { validateField } from '../middlewares/validate-field';

const router = Router();

router.get('/', getUsers);

router.post('/',[
    validateField
], saveUser);

export default router;