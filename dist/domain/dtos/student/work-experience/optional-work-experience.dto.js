"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalWorkExperienceDto = void 0;
const config_1 = require("../../../../config");
class OptionalWorkExperienceDto {
    constructor(studentId, id, company, position, functions, startDate, endDate) {
        this.studentId = studentId;
        this.id = id;
        this.company = company;
        this.position = position;
        this.functions = functions;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    static create(body, id) {
        const { studentId } = body, rest = __rest(body, ["studentId"]);
        if (!id)
            return ['id is required'];
        if (!studentId)
            return ['studentId is required'];
        const company = body.company || undefined;
        const position = body.position || undefined;
        const functions = body.functions || undefined;
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
        return [undefined, new OptionalWorkExperienceDto(studentId, id, company, position, functions, startDate, endDate)];
    }
}
exports.OptionalWorkExperienceDto = OptionalWorkExperienceDto;
