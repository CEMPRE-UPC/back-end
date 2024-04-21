"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const config_1 = require("../../../config");
class LoginUserDto {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    static create(body) {
        const { email, password } = body;
        if (!email)
            return ['El correo es requerido'];
        if (!config_1.Validators.emailPattern.test(email))
            return ['El correo no es valido'];
        if (!email.endsWith('@unicesar.edu.co'))
            return ['El correo debe ser institucional'];
        if (!password)
            return ['La contraseña es requerida'];
        if (password.length < 6)
            return ['La contraseña debe tener al menos 6 caracteres'];
        return [undefined, new LoginUserDto(email, password)];
    }
}
exports.LoginUserDto = LoginUserDto;
