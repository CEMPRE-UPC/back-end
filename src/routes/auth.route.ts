import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';


const router = Router();


router.post('/login', 
    // Validations
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('email', 'El correo debe ser institucional').custom( (email) => {
        return email.endsWith('@unicesar.edu.co');
    }),
    check('password', 'La contrasena debe tener mas de 6 caracteres').isLength({ min: 6 }),
    validateFields

,login);


export default router;