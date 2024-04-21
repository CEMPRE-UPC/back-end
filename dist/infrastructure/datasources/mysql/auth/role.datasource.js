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
exports.RoleDataSouce = void 0;
const mappers_1 = require("../../../mappers");
const mysqldb_1 = require("../../../../data/mysqldb");
class RoleDataSouce {
    getRoleByName(name) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const role = yield mysqldb_1.RoleModel.findOne({ where: { name } });
            if (!role)
                return resolve(null);
            return resolve(mappers_1.RoleMapper.roleEntityFromObject(role));
        }));
    }
}
exports.RoleDataSouce = RoleDataSouce;
