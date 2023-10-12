import { Router } from 'express';
import { check } from 'express-validator';

import { checkToken, login, saveUser } from '../controllers';
import { validateFields, isValidRole } from '../middlewares/';
import { validateEmailInDB } from '../validations';


const authRouter = Router();


authRouter.post('/login', 
    // Validations
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('email', 'El correo debe ser institucional').custom( (email) => {
        return email.endsWith('@unicesar.edu.co');
    }),
    check('password', 'La contrasena debe tener mas de 6 caracteres').isLength({ min: 6 }),
    validateFields

,login);

authRouter.post('/register',[
    isValidRole,
    check('password', 'La contrasena debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo ingresado no es valido').isEmail(),
    // validate that the email is from the domain @unicesar.edu.co
    check('email', 'El correo debe ser institucional').custom( (email) => {
        return email.endsWith('@unicesar.edu.co');
    }),
    check('email').custom( validateEmailInDB ),
    validateFields,
], saveUser);

authRouter.get('/check-token', checkToken)


export { authRouter };