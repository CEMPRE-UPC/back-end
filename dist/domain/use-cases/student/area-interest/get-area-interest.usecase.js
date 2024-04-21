"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAreaInterestUseCase = void 0;
class GetAreaInterestUseCase {
    constructor(areaInterest) {
        this.areaInterest = areaInterest;
    }
    execute(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!studentId) {
                throw new Error('Student id must be provided');
            }
            return yield this.areaInterest.getByStudentId(studentId);
        });
    }
}
exports.GetAreaInterestUseCase = GetAreaInterestUseCase;
