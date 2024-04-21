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
exports.AuthMiddleware = void 0;
const config_1 = require("../../config");
class AuthMiddleware {
    constructor(authRepository, verifyToken = config_1.JwtAdapter.validateToken) {
        this.authRepository = authRepository;
        this.verifyToken = verifyToken;
        this.validateJWT = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const authorization = req.header('Authorization');
            if (!authorization)
                return res.status(401).json({ error: 'No token provided' });
            if (!authorization.startsWith('Bearer '))
                return res.status(401).json({ error: 'Invalid Bearer token' });
            const token = authorization.split(' ').at(1) || '';
            try {
                const payload = yield this.verifyToken(token);
                if (!payload)
                    return res.status(401).json({ error: 'Invalid token' });
                const user = yield this.authRepository.getUserById(payload.id);
                if (!user)
                    return res.status(401).json({ error: 'Invalid token - user not found' });
                req.body.user = user;
                next();
            }
            catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
        this.validateUserByEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            if (!email)
                return res.status(400).json({ error: 'El correo es requerido' });
            const user = yield this.authRepository.getUserByEmail(email);
            if (!user)
                return res.status(404).json({ error: 'El correo no es el mismo con el que se registro' });
            next();
        });
        this.existUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const user = yield this.authRepository.getUserByEmail(email);
            if (user)
                return res.status(404).json({ error: 'User already exist', exist: true });
            next();
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
