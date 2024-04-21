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
exports.RoleMiddleware = void 0;
class RoleMiddleware {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
        this.validateRole = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { role: name = 'STUDENT_ROLE' } = req.body;
            try {
                const role = yield this.roleRepository.getRoleByName(name);
                if (!role) {
                    return res.status(400).json({ msg: `El rol ${name} no se encuentra registrado en DB` });
                }
                req.body.role = role;
                next();
            }
            catch (error) {
                res.status(500).json({
                    msg: 'Error, contact with admin 😁'
                });
            }
        });
    }
}
exports.RoleMiddleware = RoleMiddleware;
