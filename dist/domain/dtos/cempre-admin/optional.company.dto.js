"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalCompanyDto = void 0;
const config_1 = require("../../../config");
class OptionalCompanyDto {
    constructor(id, name, startDate, endDate) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    static create(body, id) {
        if (!id)
            return ['id is required'];
        const name = body.name || undefined;
        const startDate = body.startDate || undefined;
        const endDate = body.endDate || undefined;
        if (startDate) {
            if (!config_1.Validators.datePattern.test(startDate))
                return ['startDate is invalid'];
        }
        if (endDate) {
            if (!config_1.Validators.datePattern.test(endDate))
                return ['endDate is invalid'];
        }
        return [undefined, new OptionalCompanyDto(id, name, startDate, endDate)];
    }
}
exports.OptionalCompanyDto = OptionalCompanyDto;
