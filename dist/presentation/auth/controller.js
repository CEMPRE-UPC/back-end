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
exports.AuthController = void 0;
const use_cases_1 = require("../../domain/use-cases");
const dtos_1 = require("../../domain/dtos");
const helpers_1 = require("../helpers");
class AuthController {
    constructor(authRepositoy) {
        this.authRepositoy = authRepositoy;
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const [error, loginUserDto] = dtos_1.LoginUserDto.create(req.body);
            if (error)
                return res.status(400).json(error);
            new use_cases_1.LoginUseCase(this.authRepositoy).execute(loginUserDto)
                .then(userToken => res.json(userToken))
                .catch(error => (0, helpers_1.handleError)(error, res));
        });
        this.register = (req, res) => {
            const [error, registerUserDto] = dtos_1.RegisterUserDto.create(req.body);
            if (error)
                return res.status(400).json(error);
            new use_cases_1.RegisterUserUseCase(this.authRepositoy).execute(registerUserDto)
                .then(userToken => res.json(userToken))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.activateAccount = (req, res) => {
            const [error, token] = dtos_1.CheckTokenDto.create(req.header('Authorization'));
            if (error)
                return res.status(401).json(error);
            new use_cases_1.ActivateAccountUseCase(this.authRepositoy).execute(token)
                .then(isActive => res.json(isActive))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
        this.checkToken = (req, res) => {
            const [error, token] = dtos_1.CheckTokenDto.create(req.header('Authorization'));
            if (error)
                return res.status(401).json(error);
            new use_cases_1.CheckTokenUseCase(this.authRepositoy).execute(token)
                .then(userChecked => res.json(userChecked))
                .catch(error => (0, helpers_1.handleError)(error, res));
        };
    }
}
exports.AuthController = AuthController;
