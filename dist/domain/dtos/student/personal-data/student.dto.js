"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentDto = void 0;
const config_1 = require("../../../../config");
class StudentDto {
    constructor(id, cedula, firstName, lastName, middleName, birthDate, placeOfBirth, martialStatus, address, phone, eps, email, city, userId, secondName, practiceId) {
        this.id = id;
        this.cedula = cedula;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.birthDate = birthDate;
        this.placeOfBirth = placeOfBirth;
        this.martialStatus = martialStatus;
        this.address = address;
        this.phone = phone;
        this.eps = eps;
        this.email = email;
        this.city = city;
        this.userId = userId;
        this.secondName = secondName;
        this.practiceId = practiceId;
    }
    static create(body) {
        const { _id, id, cedula, firstName, secondName, lastName, middleName, birthDate, placeOfBirth, martialStatus, address, phone, eps, email, city, userId, practiceId } = body;
        if (!cedula)
            return ['La cedula es requerida'];
        if (!config_1.Validators.tenCharactersPattern.test(cedula))
            return ['La cedula debe tener 10 caracteres'];
        if (!config_1.Validators.onlyNumbersPattern.test(cedula))
            return ['La cedula solo puede contener numeros'];
        if (!firstName)
            return ['El primer nombre es requerido'];
        if (!config_1.Validators.onlyLettersPattern.test(firstName))
            return ['El primer nombre solo puede contener letras'];
        if (secondName.length > 0) {
            if (!config_1.Validators.onlyLettersPattern.test(secondName))
                return ['El segunndo nombre solo puede contener letras'];
        }
        if (!lastName)
            return ['El primer apellido es requerido'];
        if (!config_1.Validators.onlyLettersPattern.test(lastName))
            return ['El primer apellido solo puede contener letras'];
        if (!middleName)
            return ['El segundo apellido es requerido'];
        if (!config_1.Validators.onlyLettersPattern.test(middleName))
            return ['El segundo apellido solo puede contener letras'];
        if (!birthDate)
            return ['La fecha de nacimiento es requerida'];
        if (!config_1.Validators.datePattern.test(birthDate))
            return ['La fecha debe tener el formato yyyy-mm-dd'];
        if (!placeOfBirth)
            return ['El lugar de nacimiento es requerido'];
        if (!config_1.Validators.placeOfBirthPattern.test(placeOfBirth))
            return ['El campo debe tener el formato: "Ciudad, Departamento"'];
        if (!martialStatus)
            return ['El estado civil es requerido'];
        if (!config_1.Validators.martialStatusPattern.test(martialStatus))
            return ['El estado civil solo puede contener letras y los caracteres: ()/'];
        if (!address)
            return ['La direccion es requerida'];
        if (!config_1.Validators.addressPattern.test(address))
            return ['La direccion solo puede contener letras, numeros y los caracteres: ,.-#'];
        if (!phone)
            return ['El telefono es requerido'];
        if (!config_1.Validators.tenCharactersPattern.test(phone))
            return ['El telefono debe tener 10 caracteres'];
        if (!config_1.Validators.onlyNumbersPattern.test(phone))
            return ['El telefono solo puede contener numeros'];
        if (!eps)
            return ['La eps es requerida'];
        if (!config_1.Validators.onlyLettersPattern.test(eps))
            return ['La eps solo puede contener letras'];
        if (!email)
            return ['El email es requerido'];
        if (!config_1.Validators.emailPattern.test(email))
            return ['El email debe tener el formato'];
        if (!city)
            return ['La ciudad es requerida'];
        if (!config_1.Validators.onlyLettersPattern.test(city))
            return ['La ciudad solo puede contener letras'];
        if (!userId)
            return ['El id del usuario es requerido'];
        if (!config_1.Validators.onlyNumbersPattern.test(userId))
            return ['El id del usuario solo puede contener numeros'];
        return [undefined, new StudentDto(_id || id, cedula, firstName, lastName, middleName, birthDate, placeOfBirth, martialStatus, address, phone, eps, email, city, userId, secondName, practiceId)];
    }
    static toJSON(studentDto) {
        return {
            id: studentDto.id,
            cedula: studentDto.cedula,
            firstName: studentDto.firstName,
            secondName: studentDto.secondName,
            lastName: studentDto.lastName,
            middleName: studentDto.middleName,
            birthDate: studentDto.birthDate,
            placeOfBirth: studentDto.placeOfBirth,
            martialStatus: studentDto.martialStatus,
            address: studentDto.address,
            phone: studentDto.phone,
            eps: studentDto.eps,
            email: studentDto.email,
            city: studentDto.city,
            userId: studentDto.userId,
            practiceId: studentDto.practiceId
        };
    }
}
exports.StudentDto = StudentDto;
