"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentEntity = void 0;
class StudentEntity {
    constructor(id, cedula, firstName, secondName, lastName, middleName, birthDate, placeOfBirth, martialStatus, address, phone, eps, email, city, userId, practiceId, program, modality, practiceApplication) {
        this.id = id;
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
        this.eps = eps;
        this.email = email;
        this.city = city;
        this.userId = userId;
        this.practiceId = practiceId;
        this.program = program;
        this.modality = modality;
        this.practiceApplication = practiceApplication;
    }
}
exports.StudentEntity = StudentEntity;
