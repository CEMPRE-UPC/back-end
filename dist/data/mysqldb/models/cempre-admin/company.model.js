"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_database_1 = require("../../mysql-database");
const config_1 = require("../../../../config");
const sequelize = mysql_database_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
class CompanyModel extends sequelize_1.Model {
}
exports.CompanyModel = CompanyModel;
CompanyModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    sequelize,
    tableName: 'company',
    timestamps: false
});
