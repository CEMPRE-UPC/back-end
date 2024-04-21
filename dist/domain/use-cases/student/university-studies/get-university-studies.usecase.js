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
exports.GetByStudentIdUseCase = void 0;
const errors_1 = require("../../../errors");
class GetByStudentIdUseCase {
    constructor(universityStudiesRepository) {
        this.universityStudiesRepository = universityStudiesRepository;
    }
    execute(studentid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!studentid)
                throw errors_1.CustomError.badRequest('Student id is required');
            return yield this.universityStudiesRepository.getByIdStudent(studentid);
        });
    }
}
exports.GetByStudentIdUseCase = GetByStudentIdUseCase;
