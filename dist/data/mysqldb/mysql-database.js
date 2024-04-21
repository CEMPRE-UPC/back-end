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
exports.MysqlDatabase = void 0;
const sequelize_1 = require("sequelize");
class MysqlDatabase {
    static initialize({ mysqlUrl, database }) {
        if (!MysqlDatabase.instance) {
            MysqlDatabase.instance = new sequelize_1.Sequelize(mysqlUrl, {
                database,
                dialect: 'mysql',
                port: 3306,
                // logging: false
            });
        }
        return MysqlDatabase.instance;
    }
    static connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sequelize = this.initialize(options);
                yield sequelize.sync();
                console.log('Connection has been established successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
                throw error;
            }
        });
    }
}
exports.MysqlDatabase = MysqlDatabase;
MysqlDatabase.instance = null;
