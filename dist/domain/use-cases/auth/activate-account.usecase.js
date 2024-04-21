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
exports.ActivateAccountUseCase = void 0;
const config_1 = require("../../../config");
const custom_error_1 = require("../../errors/custom.error");
class ActivateAccountUseCase {
    constructor(authRepository, verifyToken = config_1.JwtAdapter.validateToken) {
        this.authRepository = authRepository;
        this.verifyToken = verifyToken;
    }
    execute(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield this.verifyToken(token);
            if (!payload)
                throw custom_error_1.CustomError.unauthorized('Invalid token');
            const user = yield this.authRepository.activateAccount(payload.id);
            if (!user)
                throw custom_error_1.CustomError.unauthorized('Invalid token - user not found');
            return user.isActive;
        });
    }
}
exports.ActivateAccountUseCase = ActivateAccountUseCase;
