import { Validators } from '../../../config';


export class LoginUserDto {
    constructor(
        public email: string,
        public password: string,
    ){}

    static create(body: {[key: string]: any }): [string?, LoginUserDto?] {
        const { email, password } = body;

        if (!email) return ['El correo es requerido'];
        if (!Validators.email.test(email)) return ['El correo no es valido'];
        if (!email.endsWith('@unicesar.edu.co')) return ['El correo debe ser institucional'];

        if (!password) return ['La contraseña es requerida'];
        if (password.length < 6) return ['La contraseña debe tener al menos 6 caracteres'];

        return [undefined, new LoginUserDto(email, password)];
    }
}