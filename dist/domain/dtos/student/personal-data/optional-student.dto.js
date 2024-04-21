"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalStudentDto = void 0;
const config_1 = require("../../../../config");
class OptionalStudentDto {
    constructor(cedula, firstName, secondName, lastName, middleName, birthDate, placeOfBirth, martialStatus, address, phone, city, eps) {
        this.cedula = cedula;
        this.firstName = firstName;
        this.secondName = secondName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.birthDate = birthDate;
        this.placeOfBirth = placeOfBirth;
        this.martialStatus = martialStatus;
        this.address = address;
        this.phone = phone;
        this.city = city;
        this.eps = eps;
    }
    static create(body, cedula) {
        if (!cedula)
            return ['Cedula is required'];
        const firstName = body.firstName || undefined;
        const secondName = body.secondName;
        const lastName = body.lastName || undefined;
        const middleName = body.middleName || undefined;
        const birthDate = body.birthDate || undefined;
        const placeOfBirth = body.placeOfBirth || undefined;
        const martialStatus = body.martialStatus || undefined;
        const address = body.address || undefined;
        const phone = body.phone || undefined;
        const city = body.city || undefined;
        const eps = body.eps || undefined;
        if (!config_1.Validators.tenCharactersPattern.test(cedula))
            return ['La cedula debe tener 10 caracteres'];
        if (!config_1.Validators.onlyNumbersPattern.test(cedula))
            return ['La cedula solo puede contener numeros'];
        if (!config_1.Validators.onlyLettersPattern.test(firstName))
            return ['El primer nombre solo puede contener letras'];
        if (secondName) {
            if (!config_1.Validators.onlyLettersPattern.test(secondName))
                return ['El segundo nombre solo puede contener letras'];
        }
        if (!config_1.Validators.onlyLettersPattern.test(lastName))
            return ['El primer apellido solo puede contener letras'];
        if (!config_1.Validators.onlyLettersPattern.test(middleName))
            return ['El segundo apellido solo puede contener letras'];
        if (!config_1.Validators.datePattern.test(birthDate))
            return ['La fecha debe tener el formato yyyy-mm-dd'];
        if (!config_1.Validators.placeOfBirthPattern.test(placeOfBirth))
            return ['El campo debe tener el formato: "Ciudad, Departamento"'];
        if (!config_1.Validators.martialStatusPattern.test(martialStatus))
            return ['El estado civil solo puede contener letras y los caracteres: ()/'];
        if (!config_1.Validators.addressPattern.test(address))
            return ['La direccion solo puede contener letras, numeros y los caracteres: ,.-#'];
        if (!config_1.Validators.tenCharactersPattern.test(phone))
            return ['El telefono debe tener 10 caracteres'];
        if (!config_1.Validators.onlyNumbersPattern.test(phone))
            return ['El telefono solo puede contener numeros'];
        if (!config_1.Validators.onlyLettersPattern.test(eps))
            return ['La eps solo puede contener letras'];
        if (!config_1.Validators.onlyLettersPattern.test(city))
            return ['La ciudad solo puede contener letras'];
        return [undefined, new OptionalStudentDto(cedula, firstName, secondName, lastName, middleName, birthDate, placeOfBirth, martialStatus, address, phone, city, eps)];
    }
    static toJSON(optionalStudentDto) {
        return {
            cedula: optionalStudentDto.cedula,
            firstName: optionalStudentDto.firstName,
            secondName: optionalStudentDto.secondName,
            lastName: optionalStudentDto.lastName,
            middleName: optionalStudentDto.middleName,
            birthDate: optionalStudentDto.birthDate,
            placeOfBirth: optionalStudentDto.placeOfBirth,
            martialStatus: optionalStudentDto.martialStatus,
            address: optionalStudentDto.address,
            phone: optionalStudentDto.phone,
            eps: optionalStudentDto.eps,
            city: optionalStudentDto.city,
        };
    }
}
exports.OptionalStudentDto = OptionalStudentDto;
