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
exports.RoleModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_database_1 = require("../../mysql-database");
const config_1 = require("../../../../config");
const sequelize = mysql_database_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
class RoleModel extends sequelize_1.Model {
}
exports.RoleModel = RoleModel;
const roles = [
    'STUDENT_ROLE',
    'CEMPRE_ADMIN_ROLE',
    'CEMPRE_CURR_ROLE',
    'CEMPRE_PROF_ROLE',
    'PROGRAM_AE_ROLE',
    'PROGRAM_CI_ROLE',
    'PROGRAM_EC_ROLE',
    'PROGRAM_CP_ROLE',
    'PROGRAM_AETH_ROLE',
    'FACULTAD_ADMIN_ROLE',
];
RoleModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: roles[0],
        unique: true,
    },
}, {
    sequelize,
    tableName: 'roles',
    timestamps: false
});
RoleModel.afterSync(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            for (const role of roles) {
                const [existingRole, created] = yield RoleModel.findOrCreate({
                    where: { name: role },
                    defaults: { name: role },
                    transaction: t
                });
                console.log(existingRole.get({ plain: true }));
                console.log(created);
            }
        }));
    }
    catch (error) {
        console.error('Error during transaction:', error);
    }
}));
