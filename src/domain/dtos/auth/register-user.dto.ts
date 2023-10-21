import { Validators } from '../../../config/validators';
import { RoleDto } from './role.dto';


export class RegisterUserDto {
    constructor(
        public email: string,
        public password: string,
        public isActive: boolean,
        public role: RoleDto
    ){}

    static create(body: {[key: string]: any }): [string?, RegisterUserDto?] {
        const { email, password, isActive = true, role } = body;

        if (!email) return ['El correo es requerido'];
        if (!Validators.emailPattern.test(email)) return ['El correo no es valido'];
        if (!email.endsWith('@unicesar.edu.co')) return ['El correo debe ser institucional'];

        if (!password) return ['La contraseña es requerida'];
        if (password.length < 6) return ['La contraseña debe tener al menos 6 caracteres'];
        if (!role) return ['El rol es requerido'];
        if (isActive === undefined) return ['El estado es requerido'];


        return [undefined, new RegisterUserDto(email, password, isActive, role)];
    }
}