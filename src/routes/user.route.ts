import { Router } from 'express';
import { deleteUser, getUsers, saveUser, updateUser } from '../controllers/user.controller';
import { check } from 'express-validator';
import { existUserById, validateEmailInDB } from '../validations/db-validator';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
import { isAdminRole, isValidRole } from '../middlewares/validate-role';

const router = Router();

router.get('/', getUsers);

router.post('/',[
    isValidRole,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('password', 'La contrasena debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo ingresado no es valido').isEmail(),
    // validate that the email is from the domain @unicesar.edu.co
    check('email', 'El correo debe ser institucional').custom( (email) => {
        return email.endsWith('@unicesar.edu.co');
    }),
    check('email').custom( validateEmailInDB ),
    validateFields,
], saveUser);

router.delete('/:id',
    validateJWT,
    isAdminRole,
    check('id').custom( existUserById ),
    validateFields
, deleteUser)

router.put('/:id', 
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('email', 'El correo debe ser institucional').custom( (email) => {
        return email.endsWith('@unicesar.edu.co');
    }),
    check('email').custom( validateEmailInDB ),
    check('id').custom( existUserById ),
    validateFields
, updateUser)

export default router;