"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaInterestRepository = void 0;
const domain_1 = require("../../../domain");
class AreaInterestRepository {
    constructor(areaInterest) {
        this.areaInterest = areaInterest;
    }
    register(areaInterestDto) {
        return this.areaInterest.register(areaInterestDto);
    }
    update(optAreaInterestDto) {
        return this.areaInterest.update(optAreaInterestDto);
    }
    getByStudentId(studentId) {
        if (!studentId) {
            throw domain_1.CustomError.badRequest('studentId is required');
        }
        return this.areaInterest.getByStudentId(studentId);
    }
    delete(id) {
        return this.areaInterest.delete(id);
    }
}
exports.AreaInterestRepository = AreaInterestRepository;
