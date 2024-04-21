"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const mysql_database_1 = require("../../mysql-database");
const config_1 = require("../../../../config");
const role_model_1 = require("./role.model");
const sequelize = mysql_database_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    isActive: {
        type: new sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    tableName: 'users',
    sequelize,
    timestamps: false,
});
role_model_1.RoleModel.hasMany(UserModel, { as: 'role', foreignKey: { name: 'roleId', } });
UserModel.belongsTo(role_model_1.RoleModel, { as: 'role', foreignKey: { name: 'roleId', } });
