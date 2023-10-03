import { Router } from 'express';
import { deleteUser, getUsers, updateUser } from '../controllers/user.controller';
import { check } from 'express-validator';
import { existUserById, validateEmailInDB } from '../validations/db-validator';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
import { isAdminRole } from '../middlewares/validate-role';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.delete('/:id',
    validateJWT,
    isAdminRole,
    check('id').custom( existUserById ),
    validateFields
, deleteUser)

userRouter.put('/:id', 
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('email', 'El correo debe ser institucional').custom( (email) => {
        return email.endsWith('@unicesar.edu.co');
    }),
    check('email').custom( validateEmailInDB ),
    check('id').custom( existUserById ),
    validateFields
, updateUser)

export { userRouter };