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
exports.PracticeModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_database_1 = require("../../mysql-database");
const config_1 = require("../../../../config");
const sequelize = mysql_database_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
class PracticeModel extends sequelize_1.Model {
}
exports.PracticeModel = PracticeModel;
const modalities = ['professional', 'curricular'];
PracticeModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    modality: {
        type: (0, sequelize_1.ENUM)(...modalities),
        unique: true,
    },
}, {
    sequelize,
    tableName: 'practices',
    timestamps: false
});
// insert if not exists
PracticeModel.afterSync(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            for (const modality of modalities) {
                const [existingPractice, created] = yield PracticeModel.findOrCreate({
                    where: { modality },
                    defaults: { modality },
                    transaction: t
                });
                console.log(existingPractice.get({ plain: true }));
                console.log(created);
            }
        }));
    }
    catch (error) {
        console.error('Error during transaction:', error);
    }
}));
