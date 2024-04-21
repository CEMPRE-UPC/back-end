"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyDto = void 0;
const validators_1 = require("../../../config/validators");
class CompanyDto {
    constructor(name, startDate, endDate) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    static create(body) {
        const { name, startDate, endDate } = body;
        if (!name)
            return ['El correo es requerido'];
        if (!startDate)
            return ['La contraseña es requerida'];
        if (!startDate)
            return ['startDate is required'];
        if (!validators_1.Validators.datePattern.test(startDate))
            return ['startDate is invalid'];
        if (!endDate)
            return ['endDate is required'];
        if (!validators_1.Validators.datePattern.test(endDate))
            return ['endDate is invalid'];
        return [undefined, new CompanyDto(name, startDate, endDate)];
    }
}
exports.CompanyDto = CompanyDto;
