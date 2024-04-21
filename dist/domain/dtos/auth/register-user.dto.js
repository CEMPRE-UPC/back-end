"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = void 0;
const validators_1 = require("../../../config/validators");
class RegisterUserDto {
    constructor(email, password, isActive, role) {
        this.email = email;
        this.password = password;
        this.isActive = isActive;
        this.role = role;
    }
    static create(body) {
        const { email, password, isActive = false, role } = body;
        if (!email)
            return ['El correo es requerido'];
        if (!validators_1.Validators.emailPattern.test(email))
            return ['El correo no es valido'];
        if (!email.endsWith('@unicesar.edu.co'))
            return ['El correo debe ser institucional'];
        if (!password)
            return ['La contraseña es requerida'];
        if (password.length < 6)
            return ['La contraseña debe tener al menos 6 caracteres'];
        if (!role)
            return ['El rol es requerido'];
        if (isActive === undefined)
            return ['El estado es requerido'];
        console.log(isActive);
        return [undefined, new RegisterUserDto(email, password, isActive, role)];
    }
}
exports.RegisterUserDto = RegisterUserDto;
