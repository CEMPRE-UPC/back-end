import { Router } from 'express';
import { deleteUser, getUsers, saveUser, updateUser } from '../controllers/user.controller';
import { check } from 'express-validator';
import { existUserById, isValidRole, validateEmailInDB } from '../validations/db-validator';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.get('/', getUsers);

router.post('/',[
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('password', 'La contrasena debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo ingresado no es valido').isEmail(),
    // validate that the email is from the domain @unicesar.edu.co
    check('email', 'El correo debe ser institucional').custom( (email) => {
        return email.endsWith('@unicesar.edu.co');
    }),
    check('email').custom( validateEmailInDB ),
    check('role').custom( isValidRole ),
    validateFields,
], saveUser);

router.delete('/:id',
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
    check('id').custom( existUserById )
, updateUser)

export default router;